import React from 'react';
import IndexCard from '../../components/admin/IndexCard';
import IndexStats from '../../components/admin/IndexStats';
import IndexAction from '../../components/admin/IndexAction';


const DashboardContainer = ({ saleStateCounts, purchaseStateCounts }) => {
  const saleStats = {
    pending: { label: '판매요청', value: saleStateCounts.pending || 0 },
    reception: { label: '수취완료', value: saleStateCounts.reception || 0 },
    checking: { label: '검수중', value: saleStateCounts.checking || 0 },
    completed: { label: '정산완료', value: saleStateCounts.completed || 0 },
  };

  const purchaseStats = {
    pending: { label: '결제대기', value: purchaseStateCounts.pending || 0 },
    paid: { label: '결제완료', value: purchaseStateCounts.paid || 0 },
    shipping: { label: '배송중', value: purchaseStateCounts.shipping || 0 },
    delivered: { label: '배송완료', value: purchaseStateCounts.delivered || 0 },
  };

  return (
    <>
    <div className="container mt-5">
    <div className="header">
        <h2>대시보드</h2>
    </div>

      <IndexCard title="매입 현황" link="/admin/purchase_state">
        <IndexStats stats={saleStats} />
      </IndexCard>
      <IndexCard title="판매 내역" link="/admin/pay_history">
        <IndexStats stats={purchaseStats} />
      </IndexCard>
      <div className="row mb-70">
        <IndexAction link="/admin/add_product" label="상품등록" />
        <IndexAction link="/admin/add_brand" label="브랜드 등록" />
      </div>
    </div>
    </>
    
  );
};

export default DashboardContainer;