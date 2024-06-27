package com.springproject.goodz.post.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springproject.goodz.post.dto.Like;
import com.springproject.goodz.post.dto.Post;
import com.springproject.goodz.post.dto.Tag;
import com.springproject.goodz.post.service.LikeService;
import com.springproject.goodz.post.service.PostService;
import com.springproject.goodz.post.service.TagService;
import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.service.ProductService;
import com.springproject.goodz.user.dto.Users;
import com.springproject.goodz.user.dto.Wish;
import com.springproject.goodz.user.service.FollowService;
import com.springproject.goodz.user.service.UserService;
import com.springproject.goodz.user.service.WishListService;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.service.FileService;

import io.micrometer.core.ipc.http.HttpSender.Response;
import lombok.extern.slf4j.Slf4j;



/*
 * 스타일 게시글
 * [GET]    /styles                     전체 게시글 목록
 * [GET]    /styles/게시글번호           게시글 조회
 * [GET]    /styles/update/게시글번호    게시글 수정페이지
 * [POST]   /styles/update              게시글 수정처리
 * [GET]    /styles/insert              게시글 수정페이지
 * [POST]   /styles/insert              게시글 작성처리
 * [POST]   /styles/delete/게시글번호    게시글 삭제
 *     
 * 프로필    
 * [GET]    /styles/user/@닉네임     유저 프로필
 * 
 */

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/styles")
public class PostController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private FileService fileService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private WishListService wishListService;

    @Autowired
    private FollowService followService;

    @Autowired
    private ProductService productService;

    @Autowired
    private TagService tagService;
    
    /**
     * 전체 게시글 목록
     * @return
     */
    @GetMapping("")
    public ResponseEntity<?> list() {

        try {
            // 게시글 세팅
            List<Post> postList = postService.list();
            return new ResponseEntity<>(postList, HttpStatus.OK);
            
        } catch (Exception e) {

            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        // // 세션 정보 세팅
        // Users loginUser = (Users)session.getAttribute("user");
        // model.addAttribute("loginUser", loginUser);
        
        // /* 좋아요 & 저장 세팅 */
        // // 비 로그인 시, 좋아요 전체 해제
        // if (loginUser == null) {
        //     for (Post post : postList) {
        //         post.setIsLiked("none");
        //         post.setIsWishlisted("none");
        //     }
        //     model.addAttribute("postList", postList);
            
        //     return "/post/list";

        // } else {
        //     for (Post post : postList) {
        //         // 세션아이디와 게시글 번호 기준으로 좋아요 여부 확인
        //         Like like = new Like();
        //         like.setUserId(loginUser.getUserId());
        //         like.setPostNo(post.getPostNo());
        //         boolean isChecked_like = likeService.listById(like);
                
        //         if (!isChecked_like) {
        //             post.setIsLiked("none");
        //         } else {
        //             post.setIsLiked("solid");
        //         }

        //         // 세션아이디와 게시글 번호 기준으로 저장 여부 확인
        //         Wish wish = new Wish();
        //         wish.setUserId(loginUser.getUserId());
        //         wish.setParentTable("post");
        //         wish.setParentNo(post.getPostNo());
        //         boolean isChecked_wishlist = wishListService.listById(wish);

        //         if (!isChecked_wishlist) {
        //             post.setIsWishlisted("none");
        //         } else {
        //             post.setIsWishlisted("solid");
        //         }

                
        //     }
        //     model.addAttribute("postList", postList);
        // }
    }

    // 
    
    /**
     * 게시글 상세
     * @return
     * @throws Exception 
     */
    @GetMapping("/{postNo}")
    public ResponseEntity<Map<String, Object>> read(@PathVariable("postNo")int postNo, Model model, HttpSession session) throws Exception {

        log.info("::::::" + postNo + "번 게시글 조회요청::::::");
        /* 게시글 조회 */
        Post post = postService.select(postNo);

        // /* 상품태그리스트 조회 */
        // List<Product> tempList = post.getTagList();
        // List<Product> taggedProducts = new ArrayList<>();

        /* 첨부파일 조회 */
        Files file = new Files();
        file.setParentTable("post");
        file.setParentNo(post.getPostNo());
        List<Files> fileList = fileService.listByParent(file);

        Map<String, Object> postDetails = new HashMap<>();
        postDetails.put("post", post);
        postDetails.put("fileList", fileList);

        return new ResponseEntity<>(postDetails, HttpStatus.OK);
        
        // /* 게시글 작성자 정보 세팅 */
        // Users writer = userService.select(post.getUserId());
        // model.addAttribute("writer", writer);

        // /* 세션정보 세팅 */
        // Users loginUser = (Users)session.getAttribute("user");
        // List<Users> loginUserFollowingList = new ArrayList();
        

        // /* 좋아요 & 저장 세팅 */
        // if (loginUser == null) {
        //     // 비 로그인 시, 좋아요 표시 전체 해제
        //     log.info("로그인이 되지않은 사용자");
            
        //     post.setIsLiked("none");
        //     post.setIsWishlisted("none");
            
        // } else {
        //     loginUser = userService.select(loginUser.getUserId());
        //     log.info("로그인유저의 프사번호: " + loginUser.getProfileImgNo());
        //     // 로그인 시, 유저가 체크한 좋아요&저장 표시
        //     // 세션아이디와 게시글 번호 기준으로 좋아요 여부 확인
        //     Like like = new Like();
        //     like.setUserId(loginUser.getUserId());
        //     like.setPostNo(post.getPostNo());
        //     boolean isChecked_like = likeService.listById(like);
        //     if (!isChecked_like) {
        //         post.setIsLiked("none");
        //     } else {
        //         post.setIsLiked("solid");
        //     }
            
        //     // 세션아이디와 게시글 번호 기준으로 저장 여부 확인
        //     Wish wish = new Wish();
        //     wish.setUserId(loginUser.getUserId());
        //     wish.setParentTable("post");
        //     wish.setParentNo(post.getPostNo());
        //     boolean isChecked_wishlist = wishListService.listById(wish);
        //     if (!isChecked_wishlist) {
        //         post.setIsWishlisted("none");
        //     } else {
        //         post.setIsWishlisted("solid");
        //     }
        //     // 세션아이디의 팔로우 목록 가져오기
        //     // 👤 세션계정 세팅 및 팔로잉 목록 가져오기
        //     Map<String, Object> followingDetails = followService.getFollowingDetails(loginUser.getUserId());
        //     loginUserFollowingList = (List<Users>) followingDetails.get("followingList");

        // }
            
        // model.addAttribute("loginUserFollowingList", loginUserFollowingList);
        // model.addAttribute("loginUser", loginUser);
        // model.addAttribute("post", post);
        // return "/post/read";
    }
            
    // /**
    //  * 게시글 등록 페이지
    //  * @return
    //  * @throws Exception 
    //  */
    // @GetMapping("/insert")
    // public String moveToInsert(Model model,HttpSession session) throws Exception {

    //     // 로그인된 user의 정보를 가져옴
    //     Users loginUser= (Users)session.getAttribute("user");
    //     loginUser = userService.select(loginUser.getUserId());
    //     model.addAttribute("loginUser", loginUser);
    //     log.info(loginUser.getNickname());
    //     log.info("작성화면 이동...");

    //     return "/post/insert";
    // }

    /**
     * 게시글 등록 처리
     * @param userId
     * @return
     * @throws Exception 
     */
    @PostMapping("/insert")
    public ResponseEntity<String> insert( @RequestBody Post post, @RequestParam("taggedProducts")List<Integer>taggedProducts){
        String response = "FAIL";
        int result = 0;

        log.info(post.toString());

        /* ⬇️ 게시글 등록 처리⬇️ */
        try {
            result = postService.insert(post); // 성공 -> 1
            
        } catch (Exception e) {
            e.printStackTrace();
            log.info("게시글 등록 처리 시, 예외발생");
            
            //데이터 처리 실패
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // CREATED = 201
        }

        /* ⬇️ 상품태그 등록 처리 ⬇️ */
        // 상품태그 ⭕
        if (taggedProducts != null && taggedProducts.size() > 0) {
            log.info("등록할 상품태그 존재");
            int postNo;

            try {
                // 방금 등록처리한 게시글 번호 가져옴 (상품태그의 종속게시글 번호 세팅용)
                postNo = postService.maxNo();

            } catch (Exception e) {
                e.printStackTrace();
                log.info("(상품태그등록 직전) 최근 게시글번호 조회 시, 예외발생");
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // CREATED = 201
            }

            for (Integer productNo : taggedProducts) {
                Tag tag = new Tag();
                tag.setPostNo(postNo);
                tag.setPNo(productNo);
    
                log.info("게시글번호: {}, 상품번호: {}", postNo, productNo);

                try {
                    tagService.insert(tag);
                } catch (Exception e) {
                    e.printStackTrace();
                    log.info("상품태그 등록 시, 예외발생");
                    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // CREATED = 201
                }
                response = "SUCCESS";
            }
        }
        // 상품태그 ❌
        if(result>0 && (taggedProducts.size() == 0 || taggedProducts == null) ) {
            log.info("등록할 상품태그 없음");
            response = "SUCCESS";
        }

        // // 로그인된 user의 정보를 가져옴
        // Users loginUser= (Users)session.getAttribute("user"); 

        // // 프로필로 리다이렉트를 위해 닉네임 필요하므로 아이디로 회원 조회
        // Users requested = userService.select(post.getUserId());
        // log.info(requested.getNickname() + "의 프로필로 이동중...");

        // List<Post> postList = postService.selectById(requested.getUserId());

        // model.addAttribute("postList", postList);
        // model.addAttribute("requested", requested);
        // model.addAttribute("loginUser", loginUser);

        //데이터 처리 성공
        return new ResponseEntity<>(response, HttpStatus.CREATED); // CREATED = 201
    }    
    
   
    // /**
    //  * 게시글 수정 페이지
    //  * @param postNo
    //  * @param model
    //  * @return
    //  * @throws Exception
    //  */
    // @GetMapping("/update/{postNo}")
    // public String moveToUpdate(@PathVariable("postNo")int postNo) throws Exception {

    //     /* 게시글 조회 */
    //     Post post = postService.select(postNo);
    //     model.addAttribute("post", post);

    //     /* 첨부파일 조회 */
    //     Files file = new Files();
    //     file.setParentTable("post");
    //     file.setParentNo(post.getPostNo());
    //     List<Files> fileList = fileService.listByParent(file);
    //     model.addAttribute("fileList", fileList);

    //     /* 상품태그리스트 조회 */
    //     List<Product> tempList = post.getTagList();
    //     List<Product> taggedProducts = new ArrayList<>();

    //     log.info("::::태그된 상품 정보::::");
    //     if (!tempList.isEmpty()) {
    //         for (Product product : tempList) {
    //             int productno = product.getPNo();
    //             Product taggedProduct = productService.getProductBypNo(productno);

    //             // 상품 대표이미지 가져오기
    //             Files tagItemImg = new Files();
    //             tagItemImg.setParentTable(taggedProduct.getCategory());
    //             tagItemImg.setParentNo(taggedProduct.getPNo());
    //             Files mainImg = fileService.selectMainImg(tagItemImg);
    //             // 대표 이미지 번호 저장
    //             taggedProduct.setMainImgNo(mainImg.getNo());
    //             log.info("대표이미지번호: "+taggedProduct.getMainImgNo());
                
    //             // 태그 리스트에 저장
    //             taggedProducts.add(taggedProduct);
    //             log.info(taggedProduct.toString());
    //         }
    //     }
    //     model.addAttribute("taggedProducts", taggedProducts);

    //     // 태그 리스트에서 상품번호만 추출
    //     int[] productNumList = new int[taggedProducts.size()];

    //     if (productNumList.length != 0) {
    //         for (int i = 0; i < productNumList.length; i++) {
    //             productNumList[i] = taggedProducts.get(i).getPNo();
    //         }
    //     }

    //     String productNumListStr = Arrays.toString(productNumList);

    //     model.addAttribute("productNumListStr",productNumListStr);

    //     return "/post/update";
    // }

    /**
     * 게시글 수정 처리
     * @param post
     * @param model
     * @return
     * @throws Exception 
     */
    @PutMapping("")
    public ResponseEntity<String> update(Post post, @RequestParam("taggedProducts")List<Integer>taggedProducts) {

        /* ⬇️ 게시글 수정 처리 ⬇️ */
        int result;
        String response = "FAIL";

        try {
            result = postService.update(post);
        } catch (Exception e) {
            //데이터 처리 실패
            System.err.println("게시글 수정 처리 시, 예외발생");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        log.info(":::::: {}번 게시글 삭제 처리 완료 ::::::", post.getPostNo());

        /* ⬇️ 상품태그 등록 처리 ⬇️ */
        // 기존 상품태그 삭제
        try {
            tagService.delete(post.getPostNo());
            log.info(":::::: {}번의 기존 상품태그 삭제처리 ::::::", post.getPostNo());
        } catch (Exception e) {
            log.info("기존 상품태그 삭제처리중 예외발생");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // 새롭게 리스트업된 상품태그 등록
        // 상품태그 ⭕
        if (taggedProducts != null || taggedProducts.size() > 0) {
            log.info(":::::: 새로운 상품태그 등록 ::::::");
            for (Integer productNo : taggedProducts) {
                Tag tag = new Tag();
                tag.setPostNo(post.getPostNo());
                tag.setPNo(productNo);
    
                log.info("게시글번호: {}, 상품번호: {}", post.getPostNo(), productNo);
                try {
                    tagService.insert(tag);
                } catch (Exception e) {
                    log.info("업데이트된 상품태그 등록 처리 시, 예외발생");
                    e.printStackTrace();
                    response = "FAIL";
                    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
                }

                response = "SUCCESS";
            }
        }

        // 상품태그 ❌
        if(taggedProducts.size() == 0 || taggedProducts == null) {
            /* ⬇️ 게시글 조회 페이지로 리다이렉트 처리 ⬇️ */
            log.info(post.getPostNo() + "번 게시글 수정 성공");
            response = "SUCCESS";
        }
        
        //데이터 처리 성공
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * 게시글 삭제 요청
     * @param postNo
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{postNo}")
    public ResponseEntity<String> delete(@PathVariable("postNo") int postNo) throws Exception{
        log.info("삭제할 게시글 번호: " + postNo);
        Post post = postService.select(postNo);

        /* ⬇️ 게시글 삭제처리 ⬇️ */
        int result = postService.delete(postNo);
        if (result == 0) {
            // 삭제 처리 실패
            return new ResponseEntity<>("FAIL", HttpStatus.OK);
        }

        // 댓글과 좋아요는 postNo가 외래키 ON DELETE CASCADE 조건으로 같이 삭제됨.
        
        /* ⬇️ 첨부파일 삭제처리 ⬇️ */
        Files file = new Files();
        file.setParentTable("post");    // parnetTable
        file.setParentNo(postNo);                   // parentNo
        fileService.deleteByParent(file);

        /* ⬇️ wishlist 테이블 삭제처리 ⬇️ */
        Wish wish = new Wish();
        wish.setParentTable("post");    // parnetTable
        wish.setParentNo(post.getPostNo());         // parentNo
        wishListService.deleteAll(wish);

        // 삭제 처리 성공
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

     /*
     * 유저 프로필
     */
    @GetMapping("/user/@{nickname}")
    public String usersStyle(@PathVariable("nickname") String nickname, Model model, HttpSession session) throws Exception {
        log.info("::::::::::postController::::::::::");
        log.info(nickname + "의 프로필로 이동중...");
        
        // 프로필 유저
        Users requested = userService.selectByNickname(nickname);

        
        // 로그인된 user의 정보를 가져옴
        Users loginUser= (Users)session.getAttribute("user");  
        List<Users> loginUserFollowingList = new ArrayList();  

        /* 게시글 조회 */
        List<Post> postList = postService.selectById(requested.getUserId());

        // 비 로그인 시, 좋아요 표시, 전체 해제
        if (loginUser == null) {
            log.info("로그인이 되지않은 사용자");
            
            for (Post post : postList) {
                post.setIsLiked("none");
                post.setIsWishlisted("none");
            }
            
            // 로그인 시, 유저가 체크한 좋아요 표시
        } else {
            
            for (Post post : postList) {
                // 세션아이디와 게시글 번호 기준으로 좋아요 여부 확인
                Like like = new Like();
                like.setUserId(loginUser.getUserId());
                like.setPostNo(post.getPostNo());
                boolean isChecked_like = likeService.listById(like);
                
                if (!isChecked_like) {
                    post.setIsLiked("none");
                } else {
                    post.setIsLiked("solid");
                }

                // 세션아이디와 게시글 번호 기준으로 저장 여부 확인
                Wish wish = new Wish();
                wish.setUserId(loginUser.getUserId());
                wish.setParentTable("post");
                wish.setParentNo(post.getPostNo());
                boolean isChecked_wishlist = wishListService.listById(wish);

                if (!isChecked_wishlist) {
                    post.setIsWishlisted("none");
                } else {
                    post.setIsWishlisted("solid");
                }
            }

            // 세션아이디의 팔로우 목록 가져오기
            // 👤 세션계정 세팅 및 팔로잉 목록 가져오기
            Map<String, Object> followingDetails = followService.getFollowingDetails(loginUser.getUserId());
            loginUserFollowingList = (List<Users>) followingDetails.get("followingList");
            log.info(loginUserFollowingList.toString());
            log.info(requested.toString());
        }
        
        model.addAttribute("loginUserFollowingList", loginUserFollowingList);
        model.addAttribute("requested", requested);
        model.addAttribute("loginUser", loginUser);
        model.addAttribute("postList", postList);
        

        return "/post/user/profile";
    }

    @GetMapping("/nickname={nickname}")
    public ResponseEntity<?> usersPosts(@RequestParam("nickname") String nickname) {
        log.info("{}의 게시글 조회중...", nickname);
        
        // 프로필 유저
        Users profileUser;
        try {
            profileUser = userService.selectByNickname(nickname);
        } catch (Exception e) {
            log.info("유저의 프로필 조회 시, 예외발생");
            e.printStackTrace();
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        /* 게시글 조회 */
        List<Post> postList = new ArrayList<>();
        try {
            postList = postService.selectById(profileUser.getUserId());
        } catch (Exception e) {
            log.info("유저의 게시글 조회 시, 예외발생");
            e.printStackTrace();
            // return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(postList, HttpStatus.OK);
    }
    

    
}
