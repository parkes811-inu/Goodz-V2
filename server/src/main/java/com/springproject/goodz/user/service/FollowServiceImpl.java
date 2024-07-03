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
    public List<Follow> followerList(String userId, CustomUser customUser) throws Exception {
        log.info("::::: {}의 팔로워 조회중... :::::", userId);

        List<Follow> followers = followMapper.followerList(userId);

        if (followers != null) {
            String viewerId = (customUser != null) ? customUser.getUser().getUserId() : null;
            List<Follow> viewerFollowings = new ArrayList<>();

            // 로그인사용자가 있다면 그 사람의 팔로잉 리스트 조회
            if (viewerId != null) {   // 조회할 계정과, 프로필 계정이 다른사람일때만 조회
                viewerFollowings = followMapper.followingList(viewerId);
            }

            for (Follow profileFollowerInfo : followers) {
                try {
                    Users follower = userService.select(profileFollowerInfo.getFollowerId());
                    profileFollowerInfo.setFollowerNickname(follower.getNickname());
                } catch (Exception e) {
                    log.error("팔로워 닉네임 조회 중 오류 발생: {}", e.getMessage());
                }

                // 프로필계정의 팔로워 중 로그인사용자가 팔로잉하는 계정이 있는지 확인
                for (Follow viewerFollowingInfo : viewerFollowings) {
                    // log.info("프로필 계정: {} - 팔로워: {}", profileFollowerInfo.getUserId(), profileFollowerInfo.getFollowerId() );
                    // log.info("뷰어: {} - 뷰어가 팔로우하는 계정: {}",viewerId, viewerFollowingInfo.getUserId());
                    if (viewerFollowingInfo.getUserId().equals(profileFollowerInfo.getFollowerId())) {
                        // log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                        profileFollowerInfo.setFollowed(true);
                    //     log.info("{}님이 {}님 팔로우 중", viewerId, profileFollowerInfo.getUserId());
                        break;  // 로그인 사용자의 팔로잉 계정과 프로필계정의 리스트 중 일치하는 아이디가 있으면 중단.
                    }
                }
            }

        } else {
            log.warn("팔로워 리스트가 null 입니다.");
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

        return followers;
    }

    // // 팔로워 목록과 수 조회
    // @Override
    // public Map<String, Object> getFollowerDetails(String userId) throws Exception {

    //     log.info("::::: {}의 팔로워 조회중... :::::", userId);
    //     List<Follow> followers = followerList(userId);
    //     List<Users> followerList = new ArrayList<>();

    //     if (followers != null) {
    //         for (Follow follow : followers) {
    //             Users follower = userService.select(follow.getFollowerId());
    //             followerList.add(follower);
    //         }
    //     }
        
    //     Map<String, Object> result = new HashMap<>();
    //     result.put("followerList", followerList);           // 팔로워 리스트
    //     result.put("followerCount", followerList.size());   // 팔로워 수

    //     return result;
    // }

    // 팔로잉 조회
    @Override
    public List<Follow> followingList(String followerId, CustomUser customUser) throws Exception {
        log.info("::::: {}의 팔로잉 조회중... :::::", followerId);

        List<Follow> followings = followMapper.followingList(followerId);

        if (followings != null) {
            String viewerId = (customUser != null) ? customUser.getUser().getUserId() : null;
            List<Follow> viewerFollowings = new ArrayList<>();

            // 로그인사용자가 있다면 그 사람의 팔로잉 리스트 조회
            if (viewerId != null) {   // 조회할 계정과, 프로필 계정이 다른사람일때만 조회
                viewerFollowings = followMapper.followingList(viewerId);
            }

            for (Follow profileFollowingInfo : followings) {
                try {
                    Users following = userService.select(profileFollowingInfo.getUserId());
                    profileFollowingInfo.setFollowingNickname(following.getNickname());
                } catch (Exception e) {
                    log.error("팔로잉 닉네임 조회 중 오류 발생: {}", e.getMessage());
                }

                // 프로필 계정의 팔로잉 중 로그인 사용자가 팔로잉하는 계정이 있는지 확인
                for (Follow viewerFollowingInfo : viewerFollowings) {
                    if (viewerFollowingInfo.getUserId().equals(profileFollowingInfo.getUserId())) {
                        profileFollowingInfo.setFollowed(true);
                        // log.info("{}님이 {}님 팔로우 중", viewerId, profileFollowingInfo.getUserId());

                        break;  // 로그인 사용자의 팔로잉 계정과 프로필계정의 리스트 중 일치하는 아이디가 있으면 중단.
                    }
                }
            }
        } else {
            log.warn("팔로잉 리스트가 null 입니다.");
        }

        return followings;
    }

    // // 팔로잉 목록과 수 조회
    // @Override
    // public Map<String, Object> getFollowingDetails(String userId) throws Exception{
    
    //     List<Follow> followings = followingList(userId);
    //     List<Users> followingList = new ArrayList<>();

    //     if (followingList != null) {
    //         for (Follow follow : followings) {
    //             Users following = userService.select(follow.getUserId());
    //             followingList.add(following);
    //         }
    //     }
    //     Map<String, Object> result = new HashMap<>();
    //     result.put("followingList", followingList);         // 팔로잉 목록
    //     result.put("followingCount", followingList.size()); // 팔로잉

    //     return result;
    // }

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
    @Override
    public Map<String, Integer> countFollow(String profileId) throws Exception {
        Users user = userService.select(profileId);
        
        log.info("조회할 유저: " + user.getUserId());
        log.info("팔로워 수: " + user.getCountFollower());
        log.info("팔로잉 수: " + user.getCountFollowing());

        Map<String, Integer> result = new HashMap<>();
        result.put("countFollower", user.getCountFollower());
        result.put("countFollowing", user.getCountFollowing());

        return result;
    }


}
