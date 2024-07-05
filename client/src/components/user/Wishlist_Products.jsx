import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WishlistProducts = ({ wishlistProducts }) => {
  const filter = () => {
    // 필터 로직을 여기에 구현하세요
  };

  const styles = {
    content: {
      width: '80%',
      margin: '0 auto',
      marginTop: '20px',
      padding: '20px 0',
      marginBottom: '70px',
    },
    header: {
      borderBottom: '3px solid #000',
      marginBottom: '20px',
      paddingBottom: '10px',
    },
    headerTitle: {
      fontSize: '24px',
      margin: '0',
      fontWeight: 'bold',
    },
    filterBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    filterButtons: {
      display: 'flex',
    },
    filterButton: {
      padding: '5px 15px',
      marginRight: '10px',
      border: 'none',
      borderRadius: '18px',
      backgroundColor: '#f0f0f0',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    filterButtonActive: {
      backgroundColor: '#000',
      color: '#fff',
    },
    filterButtonHover: {
      backgroundColor: '#ddd',
    },
    filterButtonActiveHover: {
      backgroundColor: '#000',
    },
    sortOrder: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      fontSize: '14px',
      cursor: 'pointer',
      marginLeft: 'auto',
    },
    sortOrderSpan: {
      marginLeft: '10px',
    },
    wishlistImg: {
      width: '100%',
    },
    wishlistCol: {
      padding: '0 5px',
    },
  };

  return (
    <div className="userMainContainer">
      <div style={styles.content}>
        <div style={styles.header}>
          <p style={styles.headerTitle}>관심</p>
        </div>
        <div style={styles.filterBar}>
          <div style={styles.filterButtons}>
            {/* 상품 혹은 스타일을 눌렀을 때 넘어가는 로직 필요 */}
            <button
              className="filter-button active"
              style={{ ...styles.filterButton, ...styles.filterButtonActive }}
              onClick={() => (window.location.href = '/users/wishlist/products')}
            >
              상품
            </button>
            <button
              className="filter-button"
              style={styles.filterButton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.filterButtonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.filterButton.backgroundColor)}
              onClick={() => (window.location.href = '/users/wishlist/posts')}
            >
              스타일
            </button>
          </div>
          <div style={styles.sortOrder} onClick={filter}>
            <span id="sort-text">기본</span> <span id="sort-icon" style={styles.sortOrderSpan}></span>
          </div>
        </div>

        {/* 리스트 */}
        <div className="row wishlist row-cols-2 row-cols-sm-2 row-cols-lg-4 g-3">
          {/* 상품 테이블에 저장된 사진과 제품명 가져오기 */}
          {/* 상품 클릭 시 해당 상품의 판매 페이지로 */}
          {wishlistProducts.map((product) => (
            <div className="col" key={product.pNo} data-price={product.formattedMinPrice} style={styles.wishlistCol}>
              <div className="card border-0">
                <div className="card-body">
                  <a href={`/product/${product.pNo}`}>
                    <img
                      src={`/files/img?imgUrl=${product.imageUrl}`}
                      alt="상품 이미지"
                      className="rounded-4 w-100"
                      style={styles.wishlistImg}
                    />
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
          ))}
        </div>

        {wishlistProducts.length === 0 && (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2 className="text-body-tertiary text-center">관심 목록에 추가된 상품이 없습니다.</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistProducts;
