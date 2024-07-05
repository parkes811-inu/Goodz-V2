import api from "../axios";

// 신상품 리스트 API 호출 함수
export const fetchNewArrivalsAndPopularPosts = () => 
    api.get("/newArrivals")
      .then(response => {
        console.log('API Response:', response.data); // 디버깅을 위한 콘솔 로그
        return response.data;
      });

// 상품 정보 가져오기
export const getProductBypNo = (pNo) => api.get(`/product/${pNo}`);
