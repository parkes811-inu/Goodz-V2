import api from "../axios";

// 관리자 홈 페이지 데이터 가져오기
export const getAdminDashboardData = () => api.get('/admin');

// 매입 현황 관련 API 호출 함수
export const getSaleStateCounts = () => api.get('/admin/sale_state_counts');

// 판매 내역 관련 API 호출 함수
export const getPurchaseStateCounts = () => api.get('/admin/purchase_state_counts');

// 브랜드 목록 조회 (키워드와 페이징을 포함)
export const list = (keyword = '', page = 1, limit = 10) => api.get('/admin/brands', {
  params: {
    keyword,
    page,
    limit,
  },
});

// 모든 브랜드 목록 조회 (페이지네이션 비활성화)
export const getAllBrands = async () => {
  let allBrands = [];
  let page = 1;
  const limit = 1000; // 충분히 큰 숫자로 설정하여 모든 브랜드를 한 번에 가져옴

  try {
    const response = await api.get('/admin/brands/all')
    console.log(`response : ${response}`);
    console.dir(response.data);
    if (response.data && Array.isArray(response.data.brandList)) {
      allBrands = await response.data.brandList;
      console.log(`allBrands : ${allBrands}`);
    }
  } catch (error) {
    console.error('Error fetching all brands:', error);
  }

  return allBrands;
};

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

// 상품 등록
export const registerProduct = (formData) => api.post('/admin/products', formData);

// 상품 옵션 등록
// export const registerProductOption = (productOptionData) => api.post('/admin/product_options', productOptionData);
export const registerProductOption = (productOptionData) => api.post('/admin/product_options', productOptionData);

// 유저가 판매한 번호 기준 단일조회
// export const userSale = (s_no) => api.get(`/admin/purchase/${s_no}`);
export const userSale = (sNo) => {
  console.log(`Making API call to /admin/purchase/${sNo}`); // 디버깅 로그 추가
  return api.get(`/admin/purchase/${sNo}`);
};
// 유저가 판매한 상품 상태 업데이트
export const updateUserSaleState = (sNo, saleState) => api.post(`/admin/purchase/update`, { sNo, saleState });

// 판매 완료 시 상품 옵션의 재고 수량 증가
export const incrementStockQuantity = (pNo, size) => api.put(`/admin/product_option/increment`, { pNo, size });

// 정산 완료에서 다른 상태로 변경 시 상품 옵션의 재고 수량 감소
export const decrementStockQuantity = (pNo, size) => api.put(`/admin/product_option/decrement`, { pNo, size });

// 사이즈 존재 여부 확인
export const checkProductOptionExists = (pNo, size) => api.post('/admin/product_option/check', { pNo, size });

// 새로운 사이즈 추가
export const insertProductOption = (pNo, size, optionPrice) => api.post('/admin/product_option', { pNo, size, optionPrice });

// initial_price 가져오기
export const getInitialPrice = (pNo) => api.get(`/admin/product/${pNo}/initial_price`);
