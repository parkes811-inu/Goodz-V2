import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLayout from '../../layout/AdminLayout';
import PurchaseDetailContainer from '../../containers/admin/PurchaseDetailContainer';
import { useParams } from 'react-router-dom';

const PurchaseDetailPage = () => {
  const { saleNo } = useParams();

  console.log("saleNo from URL params:", saleNo); // 디버깅을 위해 추가

  return (
    <AdminLayout>
      <div className="container mt-5">
        <div className="pagetitle">
          <p>매입현황</p>
        </div>
        <PurchaseDetailContainer saleNo={saleNo} />
      </div>
    </AdminLayout>
  );
};

export default PurchaseDetailPage;
