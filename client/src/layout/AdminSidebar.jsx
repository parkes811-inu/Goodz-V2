import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css'; 

const AdminSidebar = () => {
  return (
    <div className="admin_sidebar">
      <h3 className="fw-bold">관리자 페이지</h3>
      
      <h5>브랜드/상품 관리</h5>
      <ul className="list-unstyled">
        <li><Link className="text-body-secondary link-underline-light" to="/admin/brands">브랜드 목록</Link></li>
        <li><Link className="text-body-secondary link-underline-light" to="/admin/products">상품 목록</Link></li>
      </ul>
      
      <h5 className="mt-5">매입/판매 내역</h5>
      <ul className="list-unstyled">
        <li><Link className="text-body-secondary link-underline-light" to="/admin/purchase_state">매입 내역</Link></li>
        <li><Link className="text-body-secondary link-underline-light" to="/admin/pay_history">판매 내역</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

