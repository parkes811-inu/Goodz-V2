import api from "../axios";

// 유저의 페이지 데이터 가져오기
export const getUserDashboardData = () => api.get('/user');

// 유저 구매내역 데이터 가져오기
export const getPurchaseHistory =  () => api.get('/users/purchase');

//  유 아이
