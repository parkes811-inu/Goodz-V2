import api from "../axios";

// 좋아요 등록
export const addLike = (likeData, headers) => api.post(`/like`, likeData, headers);

// 좋아요 삭제
export const deleteLike = (likeData) => api.delete(`/like`, {
    data: likeData,
    headers: {'content-type': 'application/json'}
});
