package com.springproject.goodz.post.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springproject.goodz.post.dto.Like;
import com.springproject.goodz.post.dto.Post;
import com.springproject.goodz.post.dto.Tag;
import com.springproject.goodz.post.service.LikeService;
import com.springproject.goodz.post.service.PostService;
import com.springproject.goodz.post.service.TagService;
import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.service.ProductService;
import com.springproject.goodz.user.dto.CustomUser;
import com.springproject.goodz.user.dto.Users;
import com.springproject.goodz.user.dto.Wish;
import com.springproject.goodz.user.service.FollowService;
import com.springproject.goodz.user.service.UserService;
import com.springproject.goodz.user.service.WishListService;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.service.FileService;

import lombok.extern.slf4j.Slf4j;



/*
 * 스타일 게시글
 * [GET]    /styles                     전체 게시글 목록
 * [GET]    /styles/{postNo}            게시글 조회
 * [POST]   /styles                     게시글 등록 처리
 * [PUT]    /styles                     게시글 수정 처리
 * [DELETE] /styles/{postNo}            게시글 삭제 처리
 *     
 * 프로필    
 * [GET]    /styles/user/@{nickname}    유저 프로필
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
    public ResponseEntity<?> list(@AuthenticationPrincipal CustomUser customUser) {
        log.info(":::::::::::::::PostController::::::::::");
        log.info("전체게시글 조회 요청");

        try {
            // 게시글 세팅
            List<Post> postList = postService.list();

            log.info("::::: 좋아요/관심 세팅을 위한 customUser 조회 중 :::::");
            log.info("customUser : "+ customUser);
            Users loginUser = null;

            if (customUser != null) {
                log.info("로그인 사용자.");
                loginUser = customUser.getUser();
            } else {
                log.info("비로그인 사용자.");
            }

            log.info("user : " + loginUser);

            /* 좋아요 & 저장 세팅 */
            // 비 로그인 시, 좋아요 전체 해제
            if (loginUser == null) {
                for (Post post : postList) {
                    post.setLiked(false);
                    post.setWished(false);
                }
                
                return new ResponseEntity<>(postList, HttpStatus.OK);
    
            } else {
                for (Post post : postList) {
                    // 세션아이디와 게시글 번호 기준으로 좋아요 여부 확인
                    Like like = new Like();
                    like.setUserId(loginUser.getUserId());
                    like.setPostNo(post.getPostNo());
                    boolean isChecked_like = likeService.listById(like);
                    
                    post.setLiked(isChecked_like);
    
                    // 세션아이디와 게시글 번호 기준으로 저장 여부 확인
                    Wish wish = new Wish();
                    wish.setUserId(loginUser.getUserId());
                    wish.setParentTable("post");
                    wish.setParentNo(post.getPostNo());
                    // log.info("{}기준-{}번게시글-{}의 저장조회", "post", post.getPostNo(), loginUser.getUserId());
                    boolean isChecked_wishlist = wishListService.listById(wish);
                    // log.info("isChecked? : " + isChecked_wishlist);

                    post.setWished(isChecked_wishlist);
                }
            }
            return new ResponseEntity<>(postList, HttpStatus.OK);
            
        } catch (Exception e) {
            log.info("전체 게시글 조회 중 예외발생");
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    /**
     * 게시글 상세
     * @return
     * @throws Exception 
     */
    @GetMapping("/{postNo}")
    public ResponseEntity<Map<String, Object>> read(@PathVariable("postNo")int postNo, @AuthenticationPrincipal CustomUser customUser) throws Exception {
        
        Map<String, Object> postDetails = new HashMap<>();  // return으로 넘겨줄 값

        log.info("::::::" + postNo + "번 게시글 조회요청::::::");

        /* 📄 게시글 조회 */
        Post post = postService.select(postNo);
        log.info(post.toString());

        /* 🔗 상품태그리스트 조회 */
        List<Product> tempList = post.getTagList();
        List<Product> taggedProducts = new ArrayList<>();

        log.info("::::태그된 상품 정보::::");
        if (!tempList.isEmpty()) {
            for (Product product : tempList) {
                int productno = product.getPNo();
                Product taggedProduct = productService.getProductBypNo(productno);

                // 상품 대표이미지 가져오기
                Files file = new Files();
                file.setParentTable(taggedProduct.getCategory());
                file.setParentNo(taggedProduct.getPNo());
                Files mainImg = fileService.selectMainImg(file);
                // 대표 이미지 번호 저장
                taggedProduct.setMainImgNo(mainImg.getNo());
                
                // 태그 리스트에 저장
                taggedProducts.add(taggedProduct);

                log.info(taggedProduct.toString());
            }
        }
        postDetails.put("tagList", taggedProducts);
        postDetails.put("tagCount", taggedProducts.size());
        
        /* 💾 첨부파일 조회 */
        Files file = new Files();
        file.setParentTable("post");
        file.setParentNo(post.getPostNo());
        List<Files> fileList = fileService.listByParent(file);
        
        postDetails.put("post", post);
        postDetails.put("fileList", fileList);
        
        /* 👩‍💼 조회하는 유저 세팅 */
        log.info("::::: 좋아요/관심 세팅을 위한 customUser 조회 중 :::::");
        log.info("customUser : "+ customUser);
        // Users loginUser = new Users();

        Users loginUser = null;
        if (customUser != null) {
            loginUser = customUser.getUser();
        }
        log.info("user : " + loginUser);

        /* 작성자 조회 -> 팔로우 체크용 */
        Users requested = userService.selectByNickname(post.getNickname());
        // log.info("작성자닉네임: {}", requested.getNickname());
        
        /* 💛💌 좋아요 & 저장 세팅 */
        if (loginUser == null) {
            // 비 로그인 시, 좋아요 표시 전체 해제
            log.info("로그인이 되지않은 사용자");
            
            post.setLiked(false);
            post.setWished(false);
            requested.setFollowed(false);
            postDetails.put("writer", requested);

            
        } else {
            log.info("로그인된 사용자");

            /* 조회 -> 작성자 팔로우 여부 체크 */
            Boolean isFollower = followService.isFollower(requested.getUserId(), loginUser.getUserId());
            requested.setFollowed(isFollower);  // T: 팔로우중/ F:미팔로우중
            postDetails.put("writer", requested);
            
            loginUser = userService.select(loginUser.getUserId());
            // log.info("로그인유저의 프사번호: " + loginUser.getProfileImgNo());
            
            // 로그인 시, 유저가 체크한 좋아요&저장 표시
            Like like = new Like();
            like.setUserId(loginUser.getUserId());
            like.setPostNo(post.getPostNo());
            boolean isChecked_like = likeService.listById(like);
            post.setLiked(isChecked_like);
            
            // 세션아이디와 게시글 번호 기준으로 저장 여부 확인
            Wish wish = new Wish();
            wish.setUserId(loginUser.getUserId());
            wish.setParentTable("post");
            wish.setParentNo(post.getPostNo());
            boolean isChecked_wishlist = wishListService.listById(wish);
            post.setWished(isChecked_wishlist);
            
        }
        
        return new ResponseEntity<>(postDetails, HttpStatus.OK);
    }

    /**
     * 게시글 등록 처리
     * @param userId
     * @return
     * @throws Exception 
     */
    @PostMapping("")
    public ResponseEntity<String> insert(@ModelAttribute Post post, @AuthenticationPrincipal CustomUser customUser){

        log.info(post.toString());

        // 로그인 유저 정보
        // log.info("customUser : "+ customUser);

        // Users loginUser = customUser.getUser();
        // log.info("user : " + loginUser);
        // post.setUserId(loginUser.getUserId());
        
        int result = 0;
        List<Integer>taggedProducts = post.getTaggedProducts();



        /* ⬇️ 게시글 등록 처리⬇️ */
        try {
            result = postService.insert(post); // 성공 -> 1
            
        } catch (Exception e) {
            e.printStackTrace();
            log.info("게시글 등록 처리 시, 예외발생");
            
            //데이터 처리 실패
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR); // CREATED = 201
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
                return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR); // CREATED = 201
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
                    return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR); // CREATED = 201
                }
            }
        }
        // 상품태그 ❌
        if(result>0 && (taggedProducts == null || taggedProducts.size() == 0) ) {
            log.info("등록할 상품태그 없음");
        }

        try {
            Users user = userService.select(post.getUserId());

            //데이터 처리 성공
            return new ResponseEntity<>(user.getNickname(), HttpStatus.CREATED); // CREATED = 201

        } catch (Exception e) {
            log.info("유저 정보 조회 시, 예외발생");
            e.printStackTrace();
        }

        //데이터 처리 성공
        return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR); // CREATED = 201
    }    

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
    public ResponseEntity<?> usersStyle(@PathVariable("nickname") String nickname, @AuthenticationPrincipal CustomUser customUser) throws Exception {
        log.info("::::::::::postController::::::::::");
        log.info(nickname + "의 프로필 조회요청...");

        Map<String, Object> response = new HashMap<>();
        
        /* 프로필 유저 */
        Users requested = userService.selectByNickname(nickname);

        /* 게시글 조회 */
        List<Post> postList = postService.selectById(requested.getUserId());

        // 로그인 유저
        Users loginUser = null;
        log.info("customUser : "+ customUser);
        if (customUser != null) {
            log.info("로그인 사용자.");
            loginUser = customUser.getUser();
        } else {
            log.info("비로그인 사용자.");
        }
        log.info("user : " + loginUser);

        
        // 비 로그인 시, 좋아요 표시, 전체 해제
        if (loginUser == null) {
            log.info("로그인이 되지않은 사용자");
            
            for (Post post : postList) {
                post.setLiked(false);
                post.setWished(false);
            }
            
            // 로그인 시, 조회유저의 좋아요/관심/팔로우계정에 대한 팔로우 여부 세팅
        } else {
            for (Post post : postList) {
                // 세션아이디와 게시글 번호 기준으로 좋아요 여부 확인
                Like like = new Like();
                like.setUserId(loginUser.getUserId());
                like.setPostNo(post.getPostNo());
                boolean isChecked_like = likeService.listById(like);
                
                if (!isChecked_like) {
                    post.setLiked(false);
                } else {
                    post.setLiked(true);
                }
                
                // 세션아이디와 게시글 번호 기준으로 저장 여부 확인
                Wish wish = new Wish();
                wish.setUserId(loginUser.getUserId());
                wish.setParentTable("post");
                wish.setParentNo(post.getPostNo());
                boolean isChecked_wishlist = wishListService.listById(wish);
                
                if (!isChecked_wishlist) {
                    post.setWished(false);
                } else {
                    post.setWished(true);
                }
                // 조회유저의 프로필계정 팔로잉 여부
                Boolean isFollower = followService.isFollower(requested.getUserId(), loginUser.getUserId());
                requested.setFollowed(isFollower);  // T: 팔로우중/ F:미팔로우중
            }
        }
        response.put("postList", postList);
        response.put("profileUser", requested);
        log.info(response.get("profileUser").toString());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
