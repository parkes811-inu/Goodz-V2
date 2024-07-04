package com.springproject.goodz.user.service;

import java.util.List;
import java.util.Map;

import com.springproject.goodz.user.dto.CustomUser;
import com.springproject.goodz.user.dto.Follow;

public interface FollowService {

    // 팔로워 조회
    public List<Follow> followerList(String profileId, CustomUser customUser) throws Exception;

    // // 팔로워 목록과 수 조회
    // public Map<String, Object> getFollowerDetails(String profileId) throws Exception;

    // 팔로잉 조회
    public List<Follow> followingList(String profileId, CustomUser customUser) throws Exception;

    // // 팔로잉 목록과 수 조회
    // public Map<String, Object> getFollowingDetails(String profileId) throws Exception;

    // 팔로우 요청
    public int addFollow(Follow follow) throws Exception;
    
    // 언팔 요청
    public int unFollow(Follow follow) throws Exception;

    // 팔로워/팔로잉 수 조회
    public Map<String, Integer> countFollow(String profileId) throws Exception;
    
}
