import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { buy, getProductBypNo } from '../../apis/pay/pay'; // 경로를 올바르게 설정합니다.
import ProductInfo from '../../components/pay/ProductInfo';
import AddressContainer from '../../containers/pay/AddressContainer';
import PaymentContainer from '../../containers/pay/PaymentContainer';
import Order from '../../components/pay/Order';
import MainLayout from '../../layout/MainLayout';

const BuyPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pNo = queryParams.get('pNo');
  const size = queryParams.get('size');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 상품 정보를 가져옵니다.
        const productResponse = await getProductBypNo(pNo);
        const product = productResponse.data;

        // 이후 구매 정보를 가져옵니다.
        const buyResponse = await buy(pNo, size);
        console.log('API response:', buyResponse); // API 응답을 콘솔에 출력하여 확인합니다.
        const buyData = buyResponse.data;

        setData({
          product: product,
          size: buyData.size,
          initialPrice: buyData.initialPrice,
          purchaseNo: buyData.purchaseNo,
          price: buyData.price,
          defaultAddress: buyData.defaultAddress,
          hasAddress: buyData.hasAddress,
          addresses: buyData.addresses
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching buy page data:', error);
        setError('Error loading data');
        setLoading(false);
      }
    };

    fetchData();
  }, [pNo, size]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainLayout>
      <div className="container">
        <div className="buy-box">
          <form action="/pay/buy" id="buyForm" method="post">
            <input type="hidden" name="_csrf" value={data.initialPrice} />
            <input type="hidden" id="initialPrice" value={data.initialPrice} />
            <input type="hidden" id="productNo" name="productNo" value={data.product.pNo} />
            <input type="hidden" id="size" name="size" value={data.size} />
            <input type="hidden" id="purchaseNo" name="purchaseNo" value={data.purchaseNo} />
            <input type="hidden" id="purchasePrice" name="purchasePrice" value={data.price} />
            <input type="hidden" id="hiddenAddress" name="address" value={data.defaultAddress ? data.defaultAddress.address : ''} />
            <input type="hidden" id="productName" name="productName" value={data.product.productName} />

            <div className="section_unit mb-4 text-center">
              <h1 className="mt-5" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>구매하기</h1>
            </div>

            <ProductInfo product={data.product} size={data.size} />

            <AddressContainer defaultAddress={data.defaultAddress} hasAddress={data.hasAddress} addresses={data.addresses} />

            <PaymentContainer purchasePrice={data.price} productName={data.product.productName} purchaseNo={data.purchaseNo} />

            <Order price={data.price} />

            <div className="btn-wrapper w-100 mb-5" style={{ margin: '0 auto', maxWidth: '800px' }}>
              <button id="payment-button" className="btn w-100" disabled>결제하기</button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyPage;
