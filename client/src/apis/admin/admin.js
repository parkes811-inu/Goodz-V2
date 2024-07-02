import api from "../axios";

// 관리자 홈 페이지 데이터 가져오기
export const getAdminDashboardData = () => api.get('/admin');

// 매입 현황 관련 API 호출 함수
export const getSaleStateCounts = () => api.get('/admin/sale_state_counts');

// 판매 내역 관련 API 호출 함수
export const getPurchaseStateCounts = () => api.get('/admin/purchase_state_counts');

// 브랜드 목록 조회
export const list = (keyword = '', page = 1, limit = 10) => api.get('/admin/brands', {
  params: {
    keyword,
    page,
    limit,
  },
});

// 상품 목록 조회
export const productList = (keyword = '', page = 1, limit = 10) => api.get('/admin/products', {
  params: {
    keyword,
    page,
    limit,
  },
});

// 유저의 구매 상황
export const userPurchaseList = (page = 1, limit = 10) => api.get('/admin/pay_history', {
  params: {
    page,
    limit,
  },
});

// 유저의 구매 상황 전체 데이터 개수 가져오기
export const getPurchaseTotalCount = () => api.get('/api/purchase_total_count');

// 유저의 판매 상황
export const userSaleList = (page = 1, limit = 10) => api.get('/admin/purchase_state', {
  params: {
    page,
    limit,
  },
});

// 유저의 판매 상황 전체 데이터 개수 가져오기
export const getSalesTotalCount = () => api.get('/api/sales_total_count');

// 브랜드 등록
export const brandInsert = (formData) => api.post('/admin/brands', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});