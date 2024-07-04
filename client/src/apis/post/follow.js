import api from "../axios";

// 팔로워 조회
export const followerList = (userId) => api.get(`/follower/${userId}`);

// 팔로잉 조회
export const followingList = (userId) => api.get(`/following/${userId}`);

