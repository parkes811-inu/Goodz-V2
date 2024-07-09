import React, { useEffect, useState } from 'react';

const RelatedProducts = ({ brand, category, pNo }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const size = 4;
  const maxPages = 10;

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        const response = await fetch(`/product/brand/products?page=${page}&size=${size}&brand=${brand}&category=${category}&pNo=${pNo}`);
        const data = await response.json();
        
        console.log(data); // 데이터 확인

        if (Array.isArray(data)) {
          setRelatedProducts(prevProducts => [...prevProducts, ...data]);
        } else {
          console.error('Expected data to be an array:', data);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    loadRelatedProducts();
  }, [page, brand, category, pNo]);

  return (
    <div className="related-products">
      <h5>이 브랜드의 다른 상품</h5>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product, index) => (
            <div className="col" key={index}>
              <div className="card border-0">
                <div className="card-body">
                  <a href={`/product/detail/${product.pno}`}>
                    <img src={`/files/img?imgUrl=${encodeURIComponent(product.imageUrl)}`} alt="상품 이미지" className="rounded-4 w-100" />
                  </a>
                  <div className="card-text py-2">
                    <div className="d-flex justify-content-start column-gap-1">
                      <p className="user-id fw-bold m-0">{product.productName}</p>
                    </div>
                    <div className="d-flex justify-content-start column-gap-1">
                      <p id="productPrice" className="m-0 ms-2">{product.formattedMinPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>조회된 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
