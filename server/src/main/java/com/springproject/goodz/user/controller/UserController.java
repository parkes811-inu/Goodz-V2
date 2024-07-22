package com.springproject.goodz.user.controller;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.springproject.goodz.pay.dto.Purchase;
import com.springproject.goodz.pay.dto.Sales;
import com.springproject.goodz.pay.service.PayService;
import com.springproject.goodz.post.dto.Post;
import com.springproject.goodz.post.service.PostService;
import com.springproject.goodz.product.dto.Page;

import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.dto.ProductOption;
import com.springproject.goodz.product.service.ProductService;
import com.springproject.goodz.user.dto.CustomUser;
import com.springproject.goodz.user.dto.Shippingaddress;
import com.springproject.goodz.user.dto.Users;
import com.springproject.goodz.user.dto.Wish;
import com.springproject.goodz.user.service.UserService;
import com.springproject.goodz.user.service.WishListService;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private WishListService wishListService;

    @Autowired
    private PostService postService;

    @Autowired
    private ProductService productService;

    @Autowired
    private FileService fileService;

    @Autowired
    private PayService payService;

    // DecimalFormat 인스턴스 한 번 생성
    DecimalFormat decimalFormat = new DecimalFormat("#,### 원");

    @Value("${upload.path}")
    private String uploadPath;

    /**
     * 사용자 정보 조회
     * @param customUser
     * @return
     */
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {
        
        log.info("::::: customUser :::::");
        log.info("customUser : "+ customUser);

        Users user = customUser.getUser();
        log.info("user : " + user);

        // 인증된 사용자 정보 
        if( user != null ) {
            log.info("인증성공");
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        // 인증 되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
  
    @GetMapping("")
    public String index(Model model) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        log.info("========================================================");
        log.info(currentUserName);
        Users user = userService.findUserByUsername(currentUserName);
        log.info("========================================================");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        user = userService.select(user.getUserId()); // 유저 프사 가지고올때 select 쿼리에 파일번호 담겨있음.

        if (user == null) {
            log.error("User not found for username: " + currentUserName);
        } else {
            log.info("User found: " + user);
            model.addAttribute("user", user);
        }

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            // 사용자 ID를 사용하여 구매 내역 조회
            List<Purchase> purchases = payService.findPurchasesByUserId(user.getUserId());
            
            List<Purchase> pendingPurchases = new ArrayList<>();
            List<Purchase> paidPurchases = new ArrayList<>();
            List<Purchase> shippingPurchases = new ArrayList<>();
            List<Purchase> deliveredPurchases = new ArrayList<>();
            List<Purchase> cancelledPurchases = new ArrayList<>();

            for (Purchase purchase : purchases) {
                // 상태별로 구매 내역 필터링
                if("pending".equals(purchase.getPurchaseState())){
                    pendingPurchases.add(purchase);
                }else if ("paid".equals(purchase.getPurchaseState())) {
                    paidPurchases.add(purchase);
                } else if ("shipping".equals(purchase.getPurchaseState())) {
                    shippingPurchases.add(purchase);
                } else if ("delivered".equals(purchase.getPurchaseState())) {
                    deliveredPurchases.add(purchase);
                } else if ("cancelled".equals(purchase.getPurchaseState())) {
                    cancelledPurchases.add(purchase);
                }
            }
            // 구매 내역
            model.addAttribute("pendingPurchases", pendingPurchases);
            model.addAttribute("paidPurchases", paidPurchases);
            model.addAttribute("shippingPurchases", shippingPurchases);
            model.addAttribute("deliveredPurchases", deliveredPurchases);
            model.addAttribute("cancelledPurchases", cancelledPurchases);

            // 사용자 ID를 사용하여 판매 내역 조회
            List<Sales> sales = payService.findSalesByUserId(user.getUserId());
            
            List<Sales> pendingSales = new ArrayList<>();
            List<Sales> receptionSales = new ArrayList<>();
            List<Sales> checkingSales = new ArrayList<>();
            List<Sales> completedSales = new ArrayList<>();
            List<Sales> cancelledSales = new ArrayList<>();
            
            for (Sales sale : sales) {
                if ("pending".equals(sale.getSaleState())) {
                    pendingSales.add(sale);
                } else if ("reception".equals(sale.getSaleState())) {
                    receptionSales.add(sale);
                } else if("checking".equals(sale.getSaleState())) {
                    checkingSales.add(sale);
                } else if ("completed".equals(sale.getSaleState())) {
                    completedSales.add(sale);
                } else if ("cancelled".equals(sale.getSaleState())) {
                    cancelledSales.add(sale);
                }
            }
            // 판매내역 
            model.addAttribute("pendingSales", pendingSales);
            model.addAttribute("receptionSales", receptionSales);
            model.addAttribute("checkingSales", checkingSales);
            model.addAttribute("completedSales", completedSales);
            model.addAttribute("cancelledSales", cancelledSales);

            // 사용자 ID를 사용하여 관심 목록 제품 조회
            Wish temp = new Wish();
            String parentTable= "product";
            String userId = user.getUserId();
            temp.setParentTable(parentTable);
            temp.setUserId(userId);
            
            List<Wish> wishList = wishListService.fourByParent(temp);
            List<Product> wishlistProducts = new ArrayList<Product>();
            for (Wish wish : wishList) {
                Product product = new Product();
                int pNo = wish.getParentNo();
                product = productService.getProductBypNo(pNo);

                if (product != null) {  // product가 null인지 확인
                    // 상품 옵션 설정
                    List<ProductOption> options = productService.getProductOptionsByProductId(product.getPNo());
                    product.setOptions(options);

                    // 상품 이미지 설정
                    Files file = new Files();
                    file.setParentNo(product.getPNo());
                    file.setParentTable(product.getCategory());
                    List<Files> productImages = fileService.listByParent(file);

                    if (!productImages.isEmpty()) {
                        product.setImageUrl(productImages.get(0).getFilePath());
                    } else {
                        product.setImageUrl("/files/img?imgUrl=no-image.png"); // 기본 이미지 경로 설정
                    }

                    wishlistProducts.add(product); // 수정된 제품을 관심 목록에 추가

                } else {
                    log.warn("Product not found for pNo: " + pNo); // product가 null일 경우 경고 로그 출력
                }
            }
            model.addAttribute("wishlistProducts", wishlistProducts);
        }
        return "/user/index";
    }

    @GetMapping("/login")
    public String login(
        @CookieValue(value = "remember-id", required = false) Cookie cookie
        ,Model model
        ) {
        // @CookieValue(value="쿠키명", required="필수 여부")
        // - required=true (default)    : 쿠키를 필수로 가져옴 ➡ 쿠키가 없으면 에러
        // - required=false             : 쿠키 필수 ❌ ➡ 쿠키가 없어도 에러 ❌
        log.info("로그인 페이지...");

        String userId = "";                 // 저장된 아이디
        boolean rememberId = false;         // 아이디 저장 체크 여부 ( ✅, 🟩 )

        if( cookie != null ) {
            log.info("CookieName : " + cookie.getName());
            log.info("CookieValue : " + cookie.getValue());
            userId = cookie.getValue();
            rememberId = true;
        }
 
        model.addAttribute("userId", userId);
        model.addAttribute("rememberId", rememberId);
        return "/user/login";
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("user", new Users());
        return "/user/signup";
    }

    @PostMapping("/signup")
    public ModelAndView postUserInfo(@ModelAttribute Users user) {
        // 데이터를 가지고 signup2.html로 이동
        ModelAndView modelAndView = new ModelAndView("/user/signup2");
        modelAndView.addObject("user", user);
        return modelAndView;
    }

    /**
     * 중복 확인을 위한 컨트롤러
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/check")
    public ResponseEntity<String> checkIdDuplicate(@RequestBody Map<String, String> request) throws Exception {
        String userId = request.get("userId");
        String nickname = request.get("nickname");

        boolean isAvailable = userService.check(userId, nickname);
        if (isAvailable) {
            return ResponseEntity.ok("사용 가능합니다.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중입니다.");
        }
    }

    @PostMapping("/checkPassword")
    @ResponseBody
    public ResponseEntity<String> checkPassword(@RequestBody Map<String, String> request) throws Exception {
        String userId = request.get("userId");
        String password = request.get("password");

        boolean isPasswordCorrect = userService.checkPassword(userId, password);
        if (isPasswordCorrect) {
            return ResponseEntity.ok("비밀번호가 일치합니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }
    }

    @PostMapping("/update")
    public String updateUser(Users user) {

        log.info(":::::유저정보 변경요청:::::");
        log.info(user.toString());

        try {
            int result = userService.updateUser(user);

        } catch (Exception e) {
            log.error("유저 정보 업데이트에 실패했습니다..", e);
            e.printStackTrace();
            
            return "forword:/user/manage_info";
        }
        
        
        return "redirect:/user/manage_info";
    }
    


    @PostMapping("/signup2")
    public ResponseEntity<String> signUp(@RequestBody Users user) throws Exception {
        // 회원 가입 처리 로직
        userService.join(user);
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    // @GetMapping("/findID")
    // public String findID() {
    //     return "/user/findID";
    // }

    @GetMapping("/findID")
    public ResponseEntity<String> findId(@RequestBody Users user) {
        String phone = user.getPhoneNumber();
        String name = user.getUsername();

        try {
            String id = userService.findId(phone, name);
            if (id != null) {
                return ResponseEntity.ok(id);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 에러가 발생했습니다.");
        }
    }

    @GetMapping("/findPW")
    public String findPW() {
        return "/user/findPW";
    }

    @PostMapping("/findPW")
    public String findPw(Users user, RedirectAttributes redirectAttributes, Model model) throws Exception {

        Users findMan = userService.findPw(user.getUsername(), user.getBirth(), user.getUserId());
        
       // 비밀번호 찾기에 성공했을 경우
        if (findMan != null) {
        // 세션 플래시 속성에 찾은 사용자 정보를 추가합니다.
        redirectAttributes.addFlashAttribute("findMan", findMan);

        // 리다이렉트하여 비밀번호 변경 페이지로 이동합니다.
        return "redirect:/user/changePW";
       }
        // 비밀번호 찾기에 실패했을 경우
        else {
        // 리다이렉트 시 error 파라미터를 추가하여 실패했음을 알립니다.
        redirectAttributes.addAttribute("error", "true");

        // 비밀번호 찾기 페이지로 리다이렉트합니다.
        return "redirect:/user/findPW";
       }
    }


    @GetMapping("/changePW")
    public String changePW(Model model) {
        // 모델에서 findMan 속성을 가져옵니다.
        Users findMan = (Users) model.asMap().get("findMan");

        // 만약 findMan이 null인 경우, 비밀번호 찾기 페이지로 리다이렉트합니다.
        if (findMan == null) {
            return "redirect:/user/findPW";
        }

        // 모델에 findMan 속성을 추가합니다.
        model.addAttribute("findMan", findMan);

        // 비밀번호 변경 페이지로 이동합니다.
        return "/user/changePW";
    }


    @PostMapping("/changePW")
    public String changePw(@RequestParam("password") String newPassword,
                           @RequestParam("userId") String userId,
                           RedirectAttributes redirectAttributes, 
                           @ModelAttribute("findMan") Users findMan) {

            // findMan이 null이거나 사용자 ID가 일치하지 않는 경우, 비밀번호 찾기 페이지로 리다이렉트합니다.
            if (findMan == null || !findMan.getUserId().equals(userId)) {
                return "redirect:/user/findPW";
            }          

            try {
                // 비밀번호 변경 시도를 로그로 기록합니다
                log.info("비밀번호 변경 시도: userId={}, newPassword={}", userId, newPassword);

                // 비밀번호를 변경하고 결과를 받아옵니다.
                int result = userService.changePw(newPassword, userId);

                if (result > 0) {
                    // 성공 메시지를 플래시 속성에 추가하고 로그인 페이지로 리다이렉트합니다.
                    redirectAttributes.addFlashAttribute("message", "Password successfully changed.");
                    return "redirect:/user/login";

                } else {
                    // 실패 메시지를 플래시 속성에 추가하고 비밀번호 변경 페이지로 리다이렉트합니다.
                    redirectAttributes.addFlashAttribute("error", "Password change failed.");
                    return "redirect:/user/changePW";
                }
            } catch (Exception e) {
                
                // 비밀번호 변경 중 오류가 발생한 경우, 오류 메시지를 플래시 속성에 추가하고 비밀번호 변경 페이지로 리다이렉트합니다.
                log.error("비밀번호 변경 중 오류 발생", e);
                redirectAttributes.addFlashAttribute("error", "An error occurred. Please try again.");
                return "redirect:/user/changePW";
            }
    }

    /**
     * 유저 마이페이지 구매내역 세팅
     */
    @GetMapping("/purchase")
    public ResponseEntity<?> purchase(@AuthenticationPrincipal CustomUser customUser) throws Exception {

        // 로그인 유저 세팅
        log.info("{}님의 구매내역 조회중...", customUser.getUser().getUserId());
        Users user = userService.select(customUser.getUsername());
        log.info("조회할 유저정보: {}", user);

        Map<String, Object> result = new HashMap<>();

        List<Purchase> purchases = payService.findPurchasesByUserId(user.getUserId());

        List<Purchase> pendingPurchases = new ArrayList<>();
        List<Purchase> paidPurchases = new ArrayList<>();
        List<Purchase> readyPurchases = new ArrayList<>();
        List<Purchase> shippingPurchases = new ArrayList<>();
        List<Purchase> deliveredPurchases = new ArrayList<>();
        List<Purchase> cancelledPurchases = new ArrayList<>();

        for (Purchase purchase : purchases) {
            // 상품 정보 설정
            Product product = productService.getProductBypNo(purchase.getPNo());
            purchase.setProductName(product.getProductName());
            purchase.setBName(product.getBName());

            // 상품 이미지 설정
            Files file = new Files();
            file.setParentNo(purchase.getPNo());
            file.setParentTable(product.getCategory());
            List<Files> productImages = fileService.listByParent(file);

            // 첫 번째 이미지 URL 설정
            if (!productImages.isEmpty()) {
                for (Files imgFiles : productImages) {
                    if (imgFiles.getFileCode() == 1) {
                        purchase.setMainImgNo(imgFiles.getNo());
                    }
                }
                // purchase.setImageUrl(productImages.get(0).getFilePath());
            } else {
                // purchase.setImageUrl("/files/img?imgUrl=no-image.png");
                purchase.setMainImgNo(0);
            }

            // 원화 형식으로 변환
            String formattedPurchasePrice = decimalFormat.format(purchase.getPurchasePrice() + 3000);
            purchase.setFormattedPurchasePrice(formattedPurchasePrice);

            // 상태별로 구매 내역 필터링
            if ("pending".equals(purchase.getPurchaseState())) {
                pendingPurchases.add(purchase);
            } else if ("paid".equals(purchase.getPurchaseState())) {
                paidPurchases.add(purchase);
            } else if ("ready_to_ship".equals(purchase.getPurchaseState())) {
                readyPurchases.add(purchase); 
            } else if ("shipping".equals(purchase.getPurchaseState())) {
                shippingPurchases.add(purchase);
            } else if ("delivered".equals(purchase.getPurchaseState())) {
                deliveredPurchases.add(purchase);
            } else if ("cancelled".equals(purchase.getPurchaseState())) {
                cancelledPurchases.add(purchase);
            }

            // 운송장 번호 로그 추가
            System.out.println("Purchase No: " + purchase.getPurchaseNo() + ", Tracking No: " + purchase.getTrackingNo());
        }

        result.put("allPurchases", purchases);
        result.put("pendingPurchases", pendingPurchases.size());
        result.put("paidPurchases", paidPurchases.size());
        result.put("readyPurchases", readyPurchases.size());
        result.put("shippingPurchases", shippingPurchases.size());
        result.put("deliveredPurchases", deliveredPurchases.size());
        result.put("cancelledPurchases", cancelledPurchases.size());
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



    @PostMapping("/purchase/cancel/{purchaseNo}")
    public String cancelPurchase(@PathVariable int purchaseNo) {
        try {
            payService.cancelPurchase(purchaseNo);
        } catch (Exception e) {
            // 예외 처리 로직 추가
            e.printStackTrace();
        }
        return "redirect:/user/purchase"; // 구매 내역 페이지로 리다이렉트
    }



    @GetMapping("/sales")
    public String sales(Model model) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        Users user = userService.findUserByUsername(currentUserName);

        if (user == null) {
            log.error("User not found for username: " + currentUserName);
            return "redirect:/user/login";

        } else {
            model.addAttribute("user", user);
        }

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            // 사용자 ID를 사용하여 구매 내역 조회

            // 사용자 ID를 사용하여 판매 내역 조회
            List<Sales> salesList = payService.findSalesByUserId(user.getUserId());
            
            List<Sales> pendingSales = new ArrayList<>();
            List<Sales> receptionSales = new ArrayList<>();
            List<Sales> checkingSales = new ArrayList<>();
            List<Sales> completedSales = new ArrayList<>();
            List<Sales> cancelledSales = new ArrayList<>();
            
            for (Sales sale : salesList) {
                // 상품 정보 설정
                Product product = productService.getProductBypNo(sale.getPNo());
                sale.setProductName(product.getProductName());
                sale.setBName(product.getBName());  // 브랜드 이름 설정

                // 상품 이미지 설정
                Files file = new Files();
                file.setParentNo(sale.getPNo());
                file.setParentTable(product.getCategory());
                List<Files> productImages = fileService.listByParent(file);

                // 첫 번째 이미지 URL 설정
                if (!productImages.isEmpty()) {
                    sale.setImageUrl(productImages.get(0).getFilePath());
                } else {
                    sale.setImageUrl("/files/img?imgUrl=no-image.png"); // 기본 이미지 경로 설정
                }

                // 원화 형식으로 변환
                String formattedSalePrice = decimalFormat.format(sale.getSalePrice());
                sale.setFormattedSalePrice(formattedSalePrice);

                if ("pending".equals(sale.getSaleState())) {
                    pendingSales.add(sale);
                } else if ("reception".equals(sale.getSaleState())) {
                    receptionSales.add(sale);
                } else if("checking".equals(sale.getSaleState())) {
                    checkingSales.add(sale);
                } else if ("completed".equals(sale.getSaleState())) {
                    completedSales.add(sale);
                } else if ("cancelled".equals(sale.getSaleState())) {
                    cancelledSales.add(sale);
                }
            }
            // 판매내역
            model.addAttribute("pendingSales", pendingSales);
            model.addAttribute("receptionSales", receptionSales);
            model.addAttribute("checkingSales", checkingSales);
            model.addAttribute("completedSales", completedSales);
            model.addAttribute("cancelledSales", cancelledSales);
            model.addAttribute("salesList", salesList); // 통합된 구매 내역 추가
        }
        return "/user/sales";
    }

    @GetMapping("/wishlist/products")
    public String wishlist_products(Model model) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            Users user = userService.findUserByUsername(userDetails.getUsername());
            model.addAttribute("user", user);


            // 사용자 ID를 사용하여 관심 목록 제품 조회
            Wish temp = new Wish();
            String parentTable= "product";
            String userId = user.getUserId();
            temp.setParentTable(parentTable);
            temp.setUserId(userId);

            List<Wish> wishList = wishListService.listByParent(temp);
            List<Product> wishlistProducts = new ArrayList<Product>();
            for (Wish wish : wishList) {
                Product product = new Product();
                int pNo = wish.getParentNo();
                product = productService.getProductBypNo(pNo);

                if (product != null) {  // product가 null인지 확인
                    // 상품 옵션 설정
                    List<ProductOption> options = productService.getProductOptionsByProductId(product.getPNo());
                    product.setOptions(options);

                    // 상품 이미지 설정
                    Files file = new Files();
                    file.setParentNo(product.getPNo());
                    file.setParentTable(product.getCategory());
                    List<Files> productImages = fileService.listByParent(file);

                
                    // 최저 가격 계산
                    if (!options.isEmpty()) {
                        int minPrice = options.stream()
                                            .mapToInt(ProductOption::getOptionPrice)
                                            .min()
                                            .orElse(0);
                        // 원화 형식으로 변환
                        String formattedMinPrice = decimalFormat.format(minPrice);
                        product.setFormattedMinPrice(formattedMinPrice);
                    } else {
                        // 옵션이 없는 경우 기본 가격 설정 및 형식 변환
                        int initialPrice = product.getInitialPrice();
                        String formattedMinPrice = decimalFormat.format(initialPrice);
                        product.setFormattedMinPrice(formattedMinPrice);
                    }

                     // 첫 번째 이미지 URL 설정
                     if (!productImages.isEmpty()) {
                        product.setImageUrl(productImages.get(0).getFilePath());
                    } else {
                        product.setImageUrl("/files/img?imgUrl=no-image.png"); // 기본 이미지 경로 설정
                    }

                    wishlistProducts.add(product); // 수정된 제품을 관심 목록에 추가

                } else {
                    log.warn("Product not found for pNo: " + pNo); // product가 null일 경우 경고 로그 출력
                }
            }
            model.addAttribute("wishlistProducts", wishlistProducts);
        }
        return "/user/wishlist_products";
    }

    @GetMapping("/wishlist/posts")
    public String wishlist_posts(Model model) throws Exception {

        // 👤 로그인한 유저의 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        log.info("========================================================");
        log.info(currentUserName);
        Users user = userService.findUserByUsername(currentUserName);
        log.info("========================================================");
        String parentTable = "post"; // 관심리스트 - 게시글
        // 유저의 관심 게시글 리스트 불러오기;
        Wish wish = new Wish();
        wish.setParentTable(parentTable);
        wish.setUserId(user.getUserId());
        List<Wish> wishList_post = wishListService.listByParent(wish);  // 유저의 관심 게시글 리스트 (Wish 타입)
        // 유저의 관심 게시글 세팅
        List<Post> allPost = postService.list();        // 전체게시글
        List<Post> postList_wished = new ArrayList<>(); // 유저의 관심 게시글 리스트 (Post 타입)
        for (Wish wishedPost : wishList_post) {
            for (Post post : allPost) {
                // 전체 게시글 중 관심체크한 게시글 번호와 일치하는 게시글 찾기
                if (wishedPost.getParentNo() != post.getPostNo()) {
                    continue;
                }
                postList_wished.add(post);
            }
        }
        model.addAttribute("postList_wished", postList_wished);
        return "/user/wishlist_posts";
    }

    @GetMapping("/manage_info")
    public ResponseEntity<Users> manage_info(HttpSession session) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        Users user = userService.findUserByUsername(currentUserName);
        user = userService.select(user.getUserId());

        if (user == null) {
            log.error("User not found for username: " + currentUserName);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            log.info(currentUserName);
            log.info(user.toString());
            return ResponseEntity.ok(user);
        }
    }
    
    /**
     * 주소록 화면
     * @param model
     * @param session
     * @return
     * @throws Exception
     */
    @GetMapping("/address")
    public String address(Model model, HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");
        log.info("Session user: {}", user);

        if (user == null) {
            return "redirect:/user/login";
        }

        List<Shippingaddress> shippingaddresses = userService.selectByUserId(user.getUserId());
        log.info("Shipping addresses: {}", shippingaddresses);
        model.addAttribute("shippingaddresses", shippingaddresses);

    

        return "user/address";
    }

    /**
     * 배송지 등록 화면
     * @return
     */
    @GetMapping("/add_address")
    public String addAddress(Model model, HttpSession session) throws Exception{
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/user/login";
        }
        // 사용자의 기존 주소 목록을 가져옴
        List<Shippingaddress> addresses = userService.selectByUserId(user.getUserId());
        // 기존 주소가 없으면 첫 번째 주소로 간주
        boolean isFirstAddress = addresses.isEmpty();
        
        model.addAttribute("isFirstAddress", isFirstAddress);
        model.addAttribute("userId", user.getUserId());
        
        return "/user/add_address";
    }

    /**
     * 배송지 등록 처리
     * @param shippingaddress
     * @param session
     * @return
     * @throws Exception
     */
    @PostMapping("/add_address")
    public String addAddress(Shippingaddress shippingaddress, HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/user/login";
        }

        shippingaddress.setUserId(user.getUserId());

        // 사용자의 기존 주소 목록을 가져옴
        List<Shippingaddress> existingAddresses = userService.selectByUserId(user.getUserId());

        // 기존 주소가 없으면 새로 추가되는 주소를 기본 배송지로 설정
        if (existingAddresses.isEmpty()) {
            shippingaddress.setDefault(true);
        }

        int result = userService.insertAddress(shippingaddress);
        if (result > 0) {
            return "redirect:/user/address";
        } else {
            return "redirect:/user/add_address?error";
        }
    
    }

    /**
     * 배송지 수정 화면
     * @param addressNo
     * @param model
     * @param session
     * @return
     * @throws Exception
     */
    @GetMapping("/upd_address/{addressNo}")
    public String updateAddress(@PathVariable("addressNo") int addressNo, Model model, HttpSession session) throws Exception {

        log.info("-------------------- 배송지 수정 - /user/upd_address -------------------");
        log.info("---------------------------------------------------------");
        log.info(addressNo + " ");
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/user/login";
        }
    
        // 주소번호를 기반으로 해당 주소의 정보를 가져옴
        Shippingaddress shippingaddress = userService.selectAddress(addressNo);
    
        // 수정 페이지로 주소 정보를 전달
        model.addAttribute("shippingaddress", shippingaddress);
        return "/user/upd_address"; 
    }

    /**
     * 배송지 수정 처리
     * @param shippingaddress
     * @param isDefault
     * @param session
     * @return
     * @throws Exception
     */
    @PostMapping("/upd_address")
    public String updateAddress(Shippingaddress shippingaddress, String isDefault
                               ,HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/user/login";
        }
        shippingaddress.setUserId(user.getUserId());

        // 배송지 추가 기능 호출
        int result = userService.updateAddress(shippingaddress);
        if (result > 0) {
            return "redirect:/user/address";
        } else {
            return "redirect:/user/upd_address";
        }

       
    }
    
    /**
     * 배송지 삭제
     * @param addressNo
     * @param redirectAttributes
     * @return
     * @throws Exception
     */
    @PostMapping("/deleteAddress")
    public String deleteAddress(@RequestParam("addressNo") int addressNo, RedirectAttributes redirectAttributes) throws Exception {
        if (userService.isDefaultAddress(addressNo)) {
            redirectAttributes.addFlashAttribute("error", "기본 배송지는 삭제할 수 없습니다. 다른 주소를 기본 배송지로 설정 후 삭제해주세요.");
            return "redirect:/user/address";
        }

        int result = userService.deleteAddress(addressNo);

        if (result > 0) {
            return "redirect:/user/address";
        }
        return "redirect:/user/address?addressNo=" + addressNo + "&error";
    }
    
    /**
     * 기본 배송지인지 확인
     * @param addressNo
     * @return
     * @throws Exception
     */
    @GetMapping("/isDefaultAddress/{addressNo}")
    @ResponseBody
    public ResponseEntity<Boolean> isDefaultAddress(@PathVariable("addressNo") int addressNo) throws Exception {
        boolean isDefault = userService.isDefaultAddress(addressNo);
        return ResponseEntity.ok(isDefault);
    }
    
    /**
     * 계좌 정보 페이지로 이동
     * 세션에서 사용자 정보를 가져와 계좌 정보를 모델에 추가
     * 계좌 정보를 분리하여 개별 필드로 모델에 추가
     * @param session HttpSession 객체
     * @param model Model 객체
     * @return 계좌 정보 페이지 경로
     */
    @GetMapping("/account")
    public String getAccountInfo(HttpSession session, Model model) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/user/login";
        }

        String account = user.getAccount();
        model.addAttribute("account", account);
        String[] accountParts;
        String bankName = "";
        String accountNumber = "";
        String accountHolder = "";
        if (account != null) {
            accountParts = account.split(" / ");
            bankName = accountParts[0].substring(0, accountParts[0].indexOf(" "));
            accountNumber = accountParts[0].substring(accountParts[0].indexOf(" ") + 1);
            accountHolder = accountParts[1];
            }
            
        model.addAttribute("bankName", bankName);
        model.addAttribute("accountNumber", accountNumber);
        model.addAttribute("accountHolder", accountHolder);
        return "/user/account"; // account.html 템플릿을 렌더링
    }

    /**
     * 계좌 정보 저장
     * 계좌 정보를 받아서 결합하고 세션 및 DB에 저장
     * @param bankName 은행명
     * @param accountNumber 계좌번호
     * @param accountHolder 예금주
     * @param session HttpSession 객체
     * @return 계좌 정보 페이지 경로로 리다이렉트
     * @throws Exception 예외 처리
     */
    @PostMapping("/account")
    public String insertAccount(@RequestParam("bankName") String bankName, 
                                @RequestParam("accountNumber") String accountNumber, 
                                @RequestParam("accountHolder") String accountHolder, 
                                HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/user/login";
        }

        // 계좌 정보 결합
        String account = bankName + " " + accountNumber + " / " + accountHolder;
        
        userService.insertAccount(user.getUserId(), account);
        user.setAccount(account); // 세션에 업데이트된 계좌 정보 저장
        session.setAttribute("user", user); // 세션 업데이트
        return "redirect:/user/account";
    }
}

