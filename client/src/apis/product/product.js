import api from "../axios";

// 상품 정보 가져오기
export const getProductBypNo = (pNo) => api.get(`/product/${pNo}`);