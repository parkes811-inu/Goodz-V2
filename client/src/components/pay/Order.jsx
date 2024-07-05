import React, { useEffect } from 'react';

const Order = ({ price }) => {
  useEffect(() => {
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(el => {
      const price = parseFloat(el.getAttribute('data-price'));
      el.textContent = formatCurrency(price);
    });

    function formatCurrency(price) {
      return parseInt(price).toLocaleString() + ' 원';
    }
  }, [price]);

  return (
    <div className="section_unit mb-4">
      <div className="section_content p-3 border rounded order_summary">
        <div className="section_header">최종 주문 정보</div>
        <div className="summary_item">
          <span>상품 가격</span>
          <span data-price={price} className="price"></span>
        </div>
        <div className="summary_item">
          <span>검수비</span>
          <span>무료</span>
        </div>
        <div className="summary_item">
          <span>배송비</span>
          <span>3,000원</span>
        </div>
        <div className="summary_item summary_total">
          <span>총 결제금액</span>
          <span data-price={price + 3000} className="price"></span>
        </div>
      </div>
    </div>
  );
};

export default Order;
