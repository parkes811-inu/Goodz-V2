import api from "../axios";

// 구매 등록
export const insertPurchase = () => api.post('/buy');

// 결제 하기 페이지
export const buy = (pNo, size) => api.get(`/pay/buy`, { params: { pNo, size } });


// 결제 성공시 호출
export const updatePurchase = (purchaseNo) => api.put(`/buy/${purchaseNo}`);
