import React, { useContext, useEffect, useState } from 'react';
import { ProductDetailContext } from '../../contexts/product/ProductDetailContextProvider';
import ProductDetail from '../../components/product/ProductDetail';
import ProductCarousel from '../../components/product/ProductCarousel';
import ProductOptions from '../../components/product/ProductOptions';
import BuyButtons from '../../components/product/BuyButtons';
import PriceChart from '../../components/product/PriceChart';
import TaggedPosts from '../../components/product/TaggedPosts';
import RelatedProducts from '../../components/product/RelatedProducts';
import ShippingInfo from '../../components/product/ShippingInfo';

const ProductDetailContainer = () => {
  const { product, loading } = useContext(ProductDetailContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);
  const [chartPeriod, setChartPeriod] = useState('AllTime');

  useEffect(() => {
    if (product && product.minPriceSize) {
      setSelectedSize(product.minPriceSize);
    }
  }, [product]);

  useEffect(() => {
    if (product && selectedSize) {
      fetchPriceHistory(chartPeriod);
    }
  }, [product, selectedSize, chartPeriod]);

  const fetchPriceHistory = async (period) => {
    try {
      const productNo = product.product.pNo; // 정확한 필드명 사용
      console.log(`Fetching price history for productNo: ${productNo}, size: ${selectedSize}, period: ${period}`);
      const response = await fetch(`/api/getPriceHistory?period=${period}&pNo=${productNo}&size=${selectedSize}`);
      const data = await response.json();
      console.log(`Fetched data for period ${period}:`, data);
      if (Array.isArray(data)) {
        setPriceHistory(data);
      } else {
        console.error('Fetched data is not an array:', data);
        setPriceHistory([]);
      }
    } catch (error) {
      console.error('Error fetching price history:', error);
      setPriceHistory([]);
    }
  };

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
              product={product.product} 
              formattedMinPrice={product.formattedMinPrice} 
              minPriceSize={product.minPriceSize} 
            />
            <ProductOptions options={product.options} setSelectedSize={setSelectedSize} />
            <BuyButtons 
              product={product.product} 
              formattedMinPrice={product.formattedMinPrice} 
              isWishlisted={product.isWishlisted} 
            />
          <ShippingInfo />
          <PriceChart period={chartPeriod} data={priceHistory} />
          </div>
        </div>
        
        <TaggedPosts taggedPosts={product.taggedPosts} />
        <RelatedProducts brand={product.product.bname} category={product.product.category} pNo={product.product.pNo} />
      </div>
    </div>
  );
};

export default ProductDetailContainer;
