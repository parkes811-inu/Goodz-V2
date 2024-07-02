import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Wishlist_Products = ({ wishlistProducts }) => {

  const filter = () => {
    // Implement the filter logic here
  };

  return (                
    <div className="userMainContainer">
      <div className="border-bottom border-3 mb-3" style={{ borderColor: '#393E46' }}>
        <p className="fs-4 fw-bold mb-1">관심</p>
      </div>
      <div className="filter-bar">
        <div className="filter-buttons">
          {/* 상품 혹은 스타일을 눌렀을 때 넘어가는 로직 필요 */}
          <button className="filter-button active" onClick={() => window.location.href='/users/wishlist/products'}>상품</button>
          <button className="filter-button" onClick={() => window.location.href='/users/wishlist/posts'}>스타일</button>
        </div>
        <div className="sort-order" onClick={filter}>
          <span id="sort-text">기본</span> <span id="sort-icon"></span>
        </div>        
      </div>

      {/* 게시글 X */}
      {/* <div>
          <br/><br/><br/><br/><br/><br/>
          <h2 className="text-body-tertiary text-center">조회된 게시글이 없습니다.</h2>
      </div> */}

      {/* 리스트 돗자리 */}
      <div className="row wishlist row-cols-2 row-cols-sm-2 row-cols-lg-4 g-3">
        {/* 상품 테이블에 저장된 사진과 제품명 가져오기 */}
        {/* 상품 클릭 시 해당 상품의 판매 페이지로 */}
        {wishlistProducts && wishlistProducts.length > 0 ? (
          wishlistProducts.map((product, index) => (
            <div className="col" key={index} data-price={product.formattedMinPrice}>
              <div className="card border-0">
                <div className="card-body">
                  <a href={`/product/${product.pNo}`}>
                    <img src={`/files/img/${product.imageUrl}`} alt="상품 이미지" className="rounded-4 w-100" />
                  </a>
                  <div className="card-text py-2">
                    <div className="d-flex justify-content-start column-gap-1">
                      <p className="user-id fw-bold m-0">{product.productName}</p>
                    </div>
                    <div className="d-flex justify-content-start column-gap-1">
                      <p className="m-0 ms-2">{product.formattedMinPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <br/><br/><br/><br/><br/><br/>
            <h2 className="text-body-tertiary text-center">관심 목록에 추가된 상품이 없습니다.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist_Products;
