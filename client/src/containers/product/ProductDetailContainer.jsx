import React, { useContext } from 'react';
import { ProductDetailContext } from '../../contexts/product/ProductDetailContextProvider';
import ProductDetail from '../../components/product/ProductDetail';
import ProductCarousel from '../../components/product/ProductCarousel';
import ProductOptions from '../../components/product/ProductOptions';
import BuyButtons from '../../components/product/BuyButtons';

const ProductDetailContainer = () => {
  const { product, loading } = useContext(ProductDetailContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="mainContainer">
        <div className="row">
          <div className="col-md-6">
            <ProductCarousel images={product.images} />
          </div>
          <div className="col-md-6">
            <ProductDetail 
              product={product} 
              formattedMinPrice={product.formattedMinPrice} 
              minPriceSize={product.minPriceSize} 
            />
            <ProductOptions options={product.options} />
            <BuyButtons 
              product={product} 
              formattedMinPrice={product.formattedMinPrice} 
              isWishlisted={product.isWishlisted} 
            />
          </div>
        </div>
        {/* 나머지 부분도 동일한 방식으로 작성 */}
      </div>
    </div>
  );
};

export default ProductDetailContainer;
