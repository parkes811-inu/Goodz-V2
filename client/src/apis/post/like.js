import api from "../axios";

// 좋아요 등록
export const addLike = (formData, headers) => api.post(`/like`, formData, headers);

// 좋아요 삭제
export const deleteLike = (formData, headers) => api.delete(`/like`, formData, headers);
