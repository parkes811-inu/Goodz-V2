package com.springproject.goodz.product.controller;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.Comparator;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springproject.goodz.post.dto.Like;
import com.springproject.goodz.post.dto.Post;
import com.springproject.goodz.post.service.PostService;
import com.springproject.goodz.post.service.TagService;
import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.dto.ProductOption;
import com.springproject.goodz.product.service.ProductService;
import com.springproject.goodz.user.dto.Users;
import com.springproject.goodz.user.dto.Wish;
import com.springproject.goodz.user.service.UserService;
import com.springproject.goodz.user.service.WishListService;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {

    @Value("${upload.path}") // application.properties 에 설정한 업로드 경로 가져옴
    private String uploadPath;

    @Autowired
    private ProductService productService;

    @Autowired
    private FileService fileService;

    @Autowired
    private WishListService wishListService;

    @Autowired
    private TagService tagService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    // DecimalFormat 인스턴스 한 번 생성
    DecimalFormat decimalFormat = new DecimalFormat("#,### 원");

    @GetMapping("")
    public ResponseEntity<List<Product>> index() throws Exception {

        List<Product> productList = productService.list();

        for (Product product : productList) {
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
        }

        return ResponseEntity.ok(productList);
    }

    @GetMapping("/{pNo}")
    public ResponseEntity<Product> viewProduct(@PathVariable int pNo, HttpServletRequest request, 
                                               HttpServletResponse response) throws Exception {

        String cookieName = "viewedProduct_" + pNo;
        boolean alreadyViewed = false;

        // 쿠키 확인
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    alreadyViewed = true;
                    break;
                }
            }
        }

        if (!alreadyViewed) {
            // 조회수 증가 로직
            productService.updateViews(pNo);

            // 쿠키 설정 (공백 제거, 유효한 문자열 사용)
            Cookie viewCookie = new Cookie(cookieName, "true");
            viewCookie.setMaxAge((int) TimeUnit.DAYS.toSeconds(1)); // 쿠키 유효기간 1일
            viewCookie.setHttpOnly(true);
            response.addCookie(viewCookie);
        }

        // 제품 정보 모델에 추가
        Product product = productService.getProductBypNo(pNo);

        return ResponseEntity.ok(product);
    }

    @GetMapping("/size_table")
    public ResponseEntity<String> productSizeInfoPage(@RequestParam("category") String category) {
        String template;
        switch (category) {
            case "top":
                template = "fragments/product/size_table_top";
                break;
            case "pants":
                template = "fragments/product/size_table_pants";
                break;
            case "shoes":
                template = "fragments/product/size_table_shoes";
                break;
            case "accessory":
                template = "fragments/product/size_table_accessory";
                break;
            default:
                throw new IllegalArgumentException("Invalid category: " + category);
        }
        return ResponseEntity.ok(template);
    }

    @GetMapping("/detail/{pNo}")
    public ResponseEntity<Map<String, Object>> productDetailPage(@PathVariable("pNo") Integer pNo, HttpSession session) throws Exception {

        Map<String, Object> response = new HashMap<>();

        // 세션 정보 세팅
        Users loginUser = (Users)session.getAttribute("user");
        response.put("loginUser", loginUser);                   
        
        Product product = productService.getProductBypNo(pNo);
        List<ProductOption> options = productService.getProductOptionsByProductId(pNo);
        product.setOptions(options);

        Files file = new Files();
        file.setParentNo(pNo);
        file.setParentTable(product.getCategory());
        List<Files> images = fileService.listByParent(file);

        // 최저 가격과 해당 사이즈 계산
        ProductOption minPriceOption = options.stream()
                .min(Comparator.comparingInt(ProductOption::getOptionPrice))
                .orElse(null);
        
        int minPrice = minPriceOption != null ? minPriceOption.getOptionPrice() : 0;
        String minPriceSize = minPriceOption != null ? minPriceOption.getSize() : "";

        // 원화 형식으로 변환
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("ko", "KR"));
        DecimalFormat decimalFormat = (DecimalFormat) currencyFormatter;
        decimalFormat.applyPattern("#,### 원");
        String formattedMinPrice = currencyFormatter.format(minPrice);
        
        response.put("minPrice", minPrice);
        response.put("formattedMinPrice", formattedMinPrice);
        response.put("minPriceSize", minPriceSize);

        response.put("product", product);
        response.put("options", options);
        response.put("images", images);

        // 사이즈별 가격 정보를 JSON 형태로 변환
        String pricesJson = new ObjectMapper().writeValueAsString(
            options.stream().collect(Collectors.toMap(ProductOption::getSize, ProductOption::getOptionPrice))
        );
        response.put("pricesJson", pricesJson);
        
        String category = product.getCategory();
        String brand = product.getBName();

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> sizeMap = new HashMap<>();

        if (category.equals("shoes")) {
            sizeMap.put("sizes", new int[]{220, 230, 240, 250, 260, 270, 280});
        } else if (category.equals("top") || category.equals("pants")) {
            sizeMap.put("sizes", new String[]{"S", "M", "L"});
        } else {
            // accessory인 경우
            sizeMap.put("sizes", "free");
        }

        String sizeJson = objectMapper.writeValueAsString(sizeMap);
        response.put("sizeJson", sizeJson);

        // 사용자 관심 목록 확인
        boolean isWishlisted = false;
        if (loginUser != null) {
            Wish wish = new Wish();
            wish.setUserId(loginUser.getUserId());
            wish.setParentTable("product");
            wish.setParentNo(product.getPNo());
            isWishlisted = wishListService.listById(wish);
        }

        response.put("isWishlisted", isWishlisted);

        // 태그된 게시글 목록 좋아요 순 4개 조회
        List<Post> taggedPosts = postService.taggedPost(pNo);
        response.put("taggedPosts", taggedPosts);
        
        return ResponseEntity.ok(response);
    }

    // 상의 카테고리
    @GetMapping("/top")
    public ResponseEntity<List<Product>> top() throws Exception {
        List<Product> topList = productService.top();

        for (Product product : topList) {
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
        }

        return ResponseEntity.ok(topList);
    }

    // 하의 카테고리
    @GetMapping("/pants")
    public ResponseEntity<List<Product>> pants() throws Exception {
        List<Product> pantsList = productService.pants();

        for (Product product : pantsList) {
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
        }
        return ResponseEntity.ok(pantsList);
    }

    // 신발 카테고리
    @GetMapping("/shoes")
    public ResponseEntity<List<Product>> shoes() throws Exception {
        List<Product> shoesList = productService.shoes();
        for (Product product : shoesList) {
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
        }
        return ResponseEntity.ok(shoesList);
    }

    // 악세사리 카테고리
    @GetMapping("/accessory")
    public ResponseEntity<List<Product>> accessory() throws Exception {
        List<Product> accessoryList = productService.accessory();

        for (Product product : accessoryList) {
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
        }
        return ResponseEntity.ok(accessoryList);
    }

    // 인피니티 스크롤을 위한 컨트롤러
    @GetMapping("/brand/products")
    public ResponseEntity<List<Product>> getBrandProducts(@RequestParam("page") int page, 
                                                          @RequestParam("size") int size,
                                                          @RequestParam("brand") String brand,
                                                          @RequestParam("category") String category,
                                                          @RequestParam("pNo") int pNo) throws Exception {
        //int offset = Math.max(0, (page - 1) * size);
        int offset = page * size;

        // 쿼리 실행 후 결과 로그 출력
        List<Product> products = productService.findSameBrandProducts(brand, category, pNo, offset, size);

        for (Product product : products) {
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
        }

        // 쿼리 결과를 로그로 확인
        System.out.println("쿼리 결과: " + products);

        return ResponseEntity.ok(products);
    }
}

