import React, { useEffect, useState } from 'react';

const RelatedProducts = ({ productNo, brand, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState(new Set());

  useEffect(() => {
    const loadMoreProducts = () => {
      if (allProductsLoaded) return;

      fetch(`/product/brand/products?page=${page}&size=4&brand=${brand}&category=${category}&pNo=${productNo}`)
        .then(response => response.json())
        .then(data => {
          if (data.length < 4) {
            setAllProductsLoaded(true);
          }

          const newProducts = data.filter(product => !loadedProducts.has(product.productName));
          setLoadedProducts(new Set([...loadedProducts, ...newProducts.map(product => product.productName)]));
          setRelatedProducts(prevProducts => [...prevProducts, ...newProducts]);
          setPage(prevPage => prevPage + 1);
        })
        .catch(error => console.error('Error:', error));
    };

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    loadMoreProducts();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, allProductsLoaded, loadedProducts, brand, category, productNo]);

  return (
    <div className="container mt-4">
      <h5 className="text-md-start fw-bold mt-5">이 브랜드의 다른 상품</h5>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
        {relatedProducts.map((product, index) => (
          <div className="col" key={index}>
            <div className="card border-0">
              <div className="card-body">
                <a href={`/product/detail/${product.pNo}`}>
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
        ))}
      </div>
      <br /><br /><br />
      {allProductsLoaded && relatedProducts.length === 0 && (
        <h5 className="text-body-tertiary text-center"> 조회된 상품이 없습니다.</h5>
      )}
      <br /><br /><br />
    </div>
  );
};

export default RelatedProducts;
