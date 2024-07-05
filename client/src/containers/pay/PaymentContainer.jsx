/* global PaymentWidget */ // 이 주석을 추가하여 ESLint에 PaymentWidget이 전역 변수임을 알림

import React, { useEffect } from 'react';

const PaymentContainer = ({ purchasePrice, productName, purchaseNo }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment-widget'; // Include Toss Payments script
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // 결제 위젯 클라이언트 키
      const customerKey = generateRandomString(); // 고객 키
      const paymentWidget = PaymentWidget(clientKey, customerKey); // 결제 위젯 초기화

      const paymentMethodWidget = paymentWidget.renderPaymentMethods(
        "#payment-method",
        { value: purchasePrice + 3000 },
        { variantKey: "DEFAULT" }
      );

      paymentWidget.renderAgreement('#agreement', { variantKey: 'DEFAULT' });

      paymentMethodWidget.on("ready", function () {
        document.getElementById("payment-button").disabled = false;
      });

      document.getElementById("payment-button").addEventListener("click", function () {
        const recipientName = document.getElementById('recipientName').textContent;
        const phoneNumber = document.getElementById('phoneNumber').textContent.replace(/[^0-9]/g, '');
        const address = document.getElementById('address').textContent;

        paymentWidget.requestPayment({
          orderId: generateRandomString(),
          orderName: productName,
          successUrl: `${window.location.origin}/pay/complete?type=buy&purchaseNo=${purchaseNo}&address=${encodeURIComponent(address)}`,
          failUrl: `${window.location.origin}/pay/complete?type=fail`,
          customerName: recipientName,
          customerMobilePhone: phoneNumber
        });
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [purchasePrice, productName, purchaseNo]);

  function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  return (
    <div className="section_unit mb-4">
      <div className="section_content p-3 border rounded">
        <div id="payment-method"></div>
        <div id="agreement"></div>
      </div>
    </div>
  );
};

export default PaymentContainer;
