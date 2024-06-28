import api from "../axios";

// 브랜드 목록 조회
export const list = (keyword = '', page = 1, limit = 10) => api.get('/admin/brands', {
  params: {
    keyword,
    page,
    limit,
  },
});

// 관리자 홈 페이지 데이터 가져오기
export const getAdminDashboardData = () => api.get('/admin');

// 매입 현황 관련 API 호출 함수
export const getSaleStateCounts = () => api.get('/admin/sale_state_counts');

// 판매 내역 관련 API 호출 함수
export const getPurchaseStateCounts = () => api.get('/admin/purchase_state_counts');
