import api from "../axios";

// 관심 등록
export const addWish = (wishData, headers) => api.post(`/wishes`, wishData, headers);

// 관심 삭제
export const deleteWish = (wishData) => api.delete(`/wishes`, {
    data: wishData,
    headers: {'Content-Type': 'application/json'}
})