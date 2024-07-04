import api from "../axios";

// 팔로워 조회
export const followerList = (userId) => api.get(`/follower/${userId}`);

// 팔로잉 조회
export const followingList = (userId) => api.get(`/following/${userId}`);

// 팔로우 요청 (등록)
export const requestFollow = (requestData, headers) => api.post('/follow', requestData, headers);

// 언팔 요청   (팔로우 삭제)
export const unFollow = (requestData) => api.delete('/follow', {
    data: requestData,
    headers: {'content-type': 'application/json'}
});
