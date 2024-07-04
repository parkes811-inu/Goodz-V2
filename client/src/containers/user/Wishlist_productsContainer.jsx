import React from 'react';
import Wishlist_Products from '../../components/user/Wishlist_Products';

// 예제 데이터 (실제로는 이 데이터를 API 등에서 가져오게 됩니다)
const sampleWishlistProducts = [
  {
    pNo: 1,
    productName: "상품 1",
    formattedMinPrice: "₩10,000",
    imageUrl: "path/to/image1.jpg"
  },
  {
    pNo: 2,
    productName: "상품 2",
    formattedMinPrice: "₩20,000",
    imageUrl: "path/to/image2.jpg"
  }
  // 추가 데이터
];

const Wishlist_productsContainer = () => {
  return (
    <>
      <Wishlist_Products wishlistProducts={sampleWishlistProducts} />
    </>
  );
}

export default Wishlist_productsContainer;
