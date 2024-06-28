import api from "../axios";

// 유저의 페이지 데이터 가져오기
export const getUserDashboardData = () => api.get('/user');