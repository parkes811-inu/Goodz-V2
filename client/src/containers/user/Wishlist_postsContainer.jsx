import React from 'react';
import WishlistPosts from '../../components/user/Wishlist_Posts';

const Wishlist_postsContainer = () => {
  // 샘플 데이터 예시. 실제 데이터는 API 호출 등을 통해 가져오게 됩니다.
  const samplePostListWished = [
    {
      postNo: 1,
      fileNo: 'path/to/image1.jpg',
    },
    {
      postNo: 2,
      fileNo: 'path/to/image2.jpg',
    },
    // 추가 데이터
  ];

  return (
    <>
      <WishlistPosts postListWished={samplePostListWished} />
    </>
  );
}

export default Wishlist_postsContainer;
