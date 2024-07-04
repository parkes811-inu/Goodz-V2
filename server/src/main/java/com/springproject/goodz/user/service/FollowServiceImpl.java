package com.springproject.goodz.user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springproject.goodz.user.dto.CustomUser;
import com.springproject.goodz.user.dto.Follow;
import com.springproject.goodz.user.dto.Users;
import com.springproject.goodz.user.mapper.FollowMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FollowServiceImpl implements FollowService{
    
    @Autowired
    private FollowMapper followMapper;

    @Autowired
    private UserService userService;

    // 팔로워 조회
    @Override
    public List<Users> followerList(String userId, CustomUser customUser) throws Exception {
        log.info("::::: {}의 팔로워 조회중... :::::", userId);

        // 팔로워 리스트 추출 후 Users 타입 배열로 변환
        String convertTarget = "follower";
        List<Users> followerList = converterFollowToUsers(userId, convertTarget);

        // 팔로워 목록이 빈 배열인지 확인
        if (followerList != null) {
            String viewerId = (customUser != null) ? customUser.getUser().getUserId() : null;
            List<Users> viewerFollowings = new ArrayList<>();

            // 로그인사용자가 있다면 그 사람의 팔로잉 리스트 조회
            if (viewerId != null) {   // 조회할 계정과, 프로필 계정이 다른사람일때만 조회
                convertTarget = "following";
                viewerFollowings = converterFollowToUsers(viewerId, convertTarget);
            }

            // 프로필 계정의 팔로워 목록 순회하면서, 조회하는 사람이 팔로우하는 계정이면 팔로우 체크
            for (Users following : followerList) {
                String followerId = following.getUserId();
                for (Users viewersFollowing : viewerFollowings) {
                    if (followerId.equals(viewersFollowing.getUserId())) { 
                        log.info("{}님이 {}님 팔로우 중", viewerId, followerId);
                        following.setFollowed(true);
                        
                        break;
                    }
                }
            }

            // for (Follow profileFollowerInfo : followers) {
            //     try {
            //         Users follower = userService.select(profileFollowerInfo.getFollowerId());
            //         // profileFollowerInfo.setFollowerNickname(follower.getNickname());
            //         followerList.add(follower);
            //     } catch (Exception e) {
            //         log.error("팔로워 닉네임 조회 중 오류 발생: {}", e.getMessage());
            //     }

            //     if (viewerFollowings.size() != 0) {
            //         // 프로필계정의 팔로워 중 로그인사용자가 팔로잉하는 계정이 있는지 확인
            //         for (Follow viewerFollowingInfo : viewerFollowings) {
            //             // log.info("프로필 계정: {} - 팔로워: {}", profileFollowerInfo.getUserId(), profileFollowerInfo.getFollowerId() );
            //             // log.info("뷰어: {} - 뷰어가 팔로우하는 계정: {}",viewerId, viewerFollowingInfo.getUserId());
            //             if (viewerFollowingInfo.getUserId().equals(profileFollowerInfo.getFollowerId())) {
            //                 // log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            //                 profileFollowerInfo.setFollowed(true);
            //             //     log.info("{}님이 {}님 팔로우 중", viewerId, profileFollowerInfo.getUserId());
            //                 break;  // 로그인 사용자의 팔로잉 계정과 프로필계정의 리스트 중 일치하는 아이디가 있으면 중단.
            //             }
            //         }
            //     }

            // }

        } else {
            log.warn("팔로우하는 계정이 없습니다.");
        }

        // // 팔로워 리스트 중 조회계정의 팔로우여부 체크
        // String viewerId = null;
        // List<Follow> viewerFollowings= new ArrayList<>();

        // if (customUser != null) {
        //     viewerId = customUser.getUser().getUserId();
        //     viewerFollowings = followMapper.followingList(viewerId);
        // }

        // if (followers != null) {
        //     for (Follow follow : followers) {
        //         Users followerInfo = userService.select(follow.getFollowerId());    // 닉네임 조회용
        //         follow.setFollowerNickname(followerInfo.getNickname());             // 닉네임 세팅
        //         if (viewerId != null) {
        //             for (Follow viewerFollow : viewerFollowings) {
        //                 if (viewerFollow.getUserId().equals(follow.getFollowerId())) {
        //                     follow.setFollowed(true);
        //                 }
        //             }
        //             follow.setFollowed(false);
        //         }
        //     }
        // }

        return followerList;
    }

    // 팔로잉 조회
    @Override
    public List<Users> followingList(String followerId, CustomUser customUser) throws Exception {
        log.info("::::: {}의 팔로잉 조회중... :::::", followerId);


        // 팔로잉 리스트 추출 후 Users 타입 배열로 변환
        String convertTarget = "following";
        List<Users> followingList = converterFollowToUsers(followerId, convertTarget);

        // 팔로잉 목록이 빈 배열인지 확인
        if (followingList.size() != 0) {
            String viewerId = (customUser != null) ? customUser.getUser().getUserId() : null;
            List<Users> viewerFollowings = new ArrayList<>();

            // 로그인사용자가 있다면 그 사람의 팔로잉 리스트 조회
            if (viewerId != null) {
                convertTarget = "following";
                viewerFollowings = converterFollowToUsers(viewerId, convertTarget);
            }

            // 프로필 계정의 팔로잉 목록 순회하면서, 조회하는 사람이 팔로우하는 계정이면 팔로우 체크
            for (Users following : followingList) {
                String followingId = following.getUserId();
                for (Users viewersFollowing : viewerFollowings) {
                    // 조회하는 사람이 팔로우하는 계정이면 팔로우 체크
                    if (followingId.equals(viewersFollowing.getUserId())) { 
                        log.info("{}님이 {}님 팔로우 중", viewerId, followingId);
                        following.setFollowed(true);
                        log.info("팔로우설정: {}", following.isFollowed());
                        break;
                    }
                }
            }
            // for (Follow profileFollowingInfo : followings) {
            //     try {
            //         Users following = userService.select(profileFollowingInfo.getUserId());
            //         followingList.add(following);
            //         // profileFollowingInfo.setFollowingNickname(following.getNickname());
            //     } catch (Exception e) {
            //         log.error("팔로잉 닉네임 조회 중 오류 발생: {}", e.getMessage());
            //     }

            //     // 프로필 계정의 팔로잉 중 로그인 사용자가 팔로잉하는 계정이 있는지 확인
            //     for (Follow viewerFollowingInfo : viewerFollowings) {
            //         if (viewerFollowingInfo.getUserId().equals(profileFollowingInfo.getUserId())) {
            //             profileFollowingInfo.setFollowed(true);
            //             // log.info("{}님이 {}님 팔로우 중", viewerId, profileFollowingInfo.getUserId());

            //             break;  // 로그인 사용자의 팔로잉 계정과 프로필계정의 리스트 중 일치하는 아이디가 있으면 중단.
            //         }
            //     }
            // }
        } else {
            log.warn("팔로잉 중인 계정이 없습니다.");
        }

        return followingList;
    }

    // 팔로우 요청
    @Override
    public int addFollow(Follow follow) throws Exception {
        int result = followMapper.addFollow(follow);

        if (result == 0) {
            log.info("팔로우 요청 실패");
        }

        return result;
    }

    // 언팔 요청
    @Override
    public int unFollow(Follow follow) throws Exception {

        int result = followMapper.unfollow(follow);

        if (result == 0) {
            log.info("언팔 요청 실패");
        }

        return result;
    }

    // 팔로워/팔로잉 수 조회
    // @Override
    // public Map<String, Integer> countFollow(String profileId) throws Exception {
    //     Users user = userService.select(profileId);
        
    //     log.info("조회할 유저: " + user.getUserId());
    //     log.info("팔로워 수: " + user.getCountFollower());
    //     log.info("팔로잉 수: " + user.getCountFollowing());

    //     Map<String, Integer> result = new HashMap<>();
    //     result.put("countFollower", user.getCountFollower());
    //     result.put("countFollowing", user.getCountFollowing());

    //     return result;
    // }

    // 팔로워 여부 조회
    @Override
    public Boolean isFollower(String userId, String followerId) throws Exception{
        Follow follow = new Follow();
        follow.setUserId(userId);
        follow.setFollowerId(followerId);
        
        Boolean isFollower = followMapper.isFollower(follow);
        log.info("대문자 불리언: {}", isFollower);

        // boolean result = (isFollower == null || isFollower == false) ? false : true;
        // log.info("소문자 불리언: {}", result );

        return isFollower;
    }


    /**
     * ⭐convertTarget: "follower" / "following"
     * convertTarget에 따라 팔로우/팔로워 리스트 찾은 후 
     * Follow 타입 배열 ➡ User 타입 배열 변경
     * 
     * : 팔로워/팔로잉 목록에 유저 닉네임, 프로필이미지가 체크되어있어야해서.
     * 
     * @param followList
     * @param convertTarget
     * @return
     * @throws Exception
     */
    public List<Users> converterFollowToUsers(String userId, String convertTarget) throws Exception {

        List<Users> convertedList = new ArrayList<>();

        List<Follow> followList = new ArrayList<>();

        if (convertTarget.equals("follower")) {
            followList = followMapper.followerList(userId);
        } else {
            followList = followMapper.followingList(userId);
        }

        // 목록이 1명이상.
        if (followList.size() != 0) {
            for (Follow follow : followList) {
                Users user = new Users();
                // 팔로워
                if (convertTarget.equals("follower")) {
                    user = userService.select(follow.getFollowerId());
                // 팔로잉
                } else {
                    user = userService.select(follow.getUserId());
                }
                convertedList.add(user);
            }
        }
        // 목록에 0명 -> 빈배열 넘어감

        return convertedList;
    }


}
