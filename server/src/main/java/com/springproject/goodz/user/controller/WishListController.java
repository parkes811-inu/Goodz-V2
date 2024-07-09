package com.springproject.goodz.user.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.springproject.goodz.user.dto.Wish;
import com.springproject.goodz.user.service.WishListService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * 저장
 * [POST]   /like           체크 등록 요청
 * [DELETE] /like           체크 해제 요청
 * [GET]    /like/count     게시글에 체크된 갯수
 */

@Slf4j
@Controller
@RequestMapping("/wishes")
public class WishListController {

    @Autowired
    private WishListService wishListService;

    // @RequestParam("parentTable") String parentTable, @RequestParam("parentNo") int parentNo

    /**
     * 관심리스트 조회 - 부모테이블, 유저아이디 기준
     * @param parentTable
     * @param userId
     * @return
     * @throws Exception 
     */
    // @GetMapping("/parentTable={parentTable}&userId={userId}")
    // public ResponseEntity<?> listbyId(@RequestParam("parentTable") String parentTable, @RequestParam("userId") String userId, @RequestParam("parentNo") int parentNo) {
    //     log.info("ID-{} 기준 관심{}조회", userId, parentTable);

    //     Wish wish = new Wish();
    //     wish.setParentTable(parentTable);
    //     wish.setUserId(userId);
    //     wish.setParentNo(parentNo);

    //     boolean result;
    //     try {
    //         result = wishListService.listById(wish);
    //         // log.info(wishList.toString());

    //         if(result == true) {
    //             return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    //         } else {
    //             return new ResponseEntity<>("FAIL", HttpStatus.OK);
    //         }
    //     } catch (Exception e) {
    //         log.info("관심리스트 조회 중 예외 발생");
    //         e.printStackTrace();
    //     }
    //     return null;

    // }
    @GetMapping("/status")
    public ResponseEntity<Map<String, Boolean>> getWishlistStatus(@RequestParam("parentTable") String parentTable,
                                                                @RequestParam("parentNo") int parentNo,
                                                                @RequestParam("userId") String userId) throws Exception {
        log.info("Checking wishlist status for userId: {}, parentTable: {}, parentNo: {}", userId, parentTable, parentNo);
        Wish wish = new Wish();
        wish.setParentTable(parentTable);
        wish.setUserId(userId);
        wish.setParentNo(parentNo);
    
        boolean isWishlisted = wishListService.listById(wish);
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("isWishlisted", isWishlisted);
        
        return ResponseEntity.ok(response);
    }


    /**
     * 저장 등록 요청 (off -> on)
     * @param wish
     * @return
     * @throws Exception
     */
    @PostMapping("")
    public ResponseEntity<String> wishOn(@RequestBody Wish wish) throws Exception {
        log.info("저장 on 요청");
        log.info(":::::요청정보:::::");
        log.info("종속테이블:" + wish.getParentTable());
        log.info("번호:" + wish.getParentNo());

        int result = wishListService.wishOn(wish);

         if (result == 0) {
            // 데이터 처리 실패
            return new ResponseEntity<>("FAIL", HttpStatus.OK); // OK = 200
        }
        
        //데이터 처리 성공
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    /**
     * 저장 삭제 요청 (on -> off)
     * @param wish
     * @return
     * @throws Exception
     */
    @DeleteMapping("")
    public ResponseEntity<String> wishOff(@RequestBody Wish wish) throws Exception {
        log.info("저장 off 요청");
        log.info(":::::요청정보:::::");
        log.info("종속테이블:" + wish.getParentTable());
        log.info("번호:" + wish.getParentNo());

        int result = wishListService.wishOff(wish);

         if (result == 0) {
            // 데이터 처리 실패
            return new ResponseEntity<>("FAIL", HttpStatus.OK); // OK = 200
        }
        
        //데이터 처리 성공
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    /**
     * 상품/게시글에 체크된 저장 갯수 조회
     * @param wish
     * @return
     * @throws Exception
     */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> countWish(@RequestParam("parentTable") String parentTable, @RequestParam("parentNo") int parentNo) throws Exception {
        
        Wish wish = new Wish();
        wish.setParentTable(parentTable);
        wish.setParentNo(parentNo);
        long countWish = wishListService.countWish(wish);

        log.info("업데이트된 저장 수: " + countWish);

        Map<String, Long> response = new HashMap<>();
        response.put("countWish", countWish);
        

        return ResponseEntity.ok(response);
    }
    
    
}
