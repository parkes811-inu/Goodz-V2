package com.springproject.goodz.user.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.springproject.goodz.user.dto.CustomUser;
import com.springproject.goodz.user.dto.Follow;
import com.springproject.goodz.user.dto.Users;
import com.springproject.goodz.user.service.FollowService;
import com.springproject.goodz.user.service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@Slf4j
@RestController
public class FollowController {

    @Autowired
    private FollowService followService;

    @Autowired
    private UserService userService;


    /**
     * 팔로워 조회 - 프로필계정 요청한 id 기준
     */
    // @ApiOperation(value="팔로워 조회", notes="요청한 id의 팔로워를 조회합니다.")
    // @ApiResponses({
    //     @ApiResponse(code = 200, message = "API 정상작동"),
    //     @ApiResponse(code = 500, message = "서버측 에런")
    // })
    @GetMapping("/follower/{userId}")
    public ResponseEntity<?> followerCount(@PathVariable("userId")String profileId, @AuthenticationPrincipal CustomUser customUser) {

         try {
            log.info("::::: {}의 팔로워 조회요청:::::", profileId);
            /**
             * 팔로워 목록과 수 조회
             * "followerList"   : List<Users> followerList          ➡ 팔로워 리스트
             * "followerCount"  : List<Users> followerList.size()   ➡ 팔로워 수
             */
            List<Follow> followerDetails = followService.followerList(profileId, customUser);
            
            log.info(":::::: {}의 팔로워 정보 :::::", profileId);
            log.info(profileId +"님의 팔로워 리스트: " + followerDetails.toString());
            log.info(profileId +"님의 팔로워 수: " + followerDetails.size());
            return new ResponseEntity<>(followerDetails, HttpStatus.OK);

        } catch (Exception e) {
            log.info("팔로잉 조회 시 예외 발생");
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }       

    /**
     * 팔로잉 조회 - 프로필계정 id 기준
     * @param userId
     * @param model
     * @return
     */
    @GetMapping("/following/{userId}")
    public ResponseEntity<?> followingCount(@PathVariable("userId")String profileId, @AuthenticationPrincipal CustomUser customUser) {

        try {
            log.info("::::: {}의 팔로잉 조회요청:::::", profileId);

            /**
             * 팔로워 목록과 수 조회
             * "followingList"   : List<Users> followingList          ➡ 팔로워 리스트
             * "followingCount"  : List<Users> followingList.size()   ➡ 팔로워 수
             */
            // Map<String, Object> followingDetails = followService.getFollowingDetails(profileId);
            List<Follow> followingDetails = followService.followingList(profileId, customUser);

            log.info(":::::: {}의 팔로잉 정보 :::::", profileId);
            log.info(profileId+"님의 팔로잉 리스트: " + followingDetails.toString());
            log.info(profileId+"님의 팔로잉 수: " + followingDetails.size());

            return new ResponseEntity<>(followingDetails, HttpStatus.OK);

        } catch (Exception e) {
            log.info("팔로잉 조회 시 예외 발생");
            e.printStackTrace();
        }

        return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 팔로우 등록처리
     * @param follow
     * @return
     * @throws Exception
     */
    @PostMapping("/follow")
    public ResponseEntity<String> addFollow(@RequestBody Follow follow) throws Exception {
        log.info("::::: 팔로우 요청 :::::");
        log.info(follow.getFollowerId() + " -> " + follow.getUserId());

        int result = followService.addFollow(follow);

        if (result == 0) {
            //팔로우 등록 실패
            return new ResponseEntity<>("FAIL", HttpStatus.OK);
        }

        // 팔로우 등록 성공
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    /**
     * 언팔 처리 (=팔로우 삭제 처리)
     * @param follow
     * @return
     * @throws Exception
     */
    @DeleteMapping("/follow")
    public ResponseEntity<String> unFollow(@RequestBody Follow follow) throws Exception {
        log.info("::::: 언팔 요청 :::::");
        log.info(follow.getFollowerId() + " -/-> " + follow.getUserId());


        int result = followService.unFollow(follow);

        if (result == 0) {
            //팔로우 등록 실패
            return new ResponseEntity<>("FAIL", HttpStatus.OK);
        }

        // 팔로우 등록 성공
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    // @GetMapping("/follow/count/{profileId}")
    // public ResponseEntity<Map<String, Integer>> countFollow(@PathVariable("profileId") String profileId) throws Exception {


    //     Map<String, Integer> countFollow =  followService.countFollow(profileId);

    //     log.info("업데이트된 팔로워 수: " + countFollow.get("countFollower"));
    //     log.info("업데이트된 팔로잉 수: " + countFollow.get("countFollowing"));

    //     return ResponseEntity.ok(countFollow);
    // }
    
    
}
