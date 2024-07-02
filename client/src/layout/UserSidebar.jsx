import React from 'react';
import { Link } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = () => {
  return (           
    <div className="container">
      <div className="sidebar">
        <h3 className="fw-bold">마이 페이지</h3>
        
        <h5>쇼핑 정보</h5>
        <ul className="list-unstyled">
          <li><Link className="text-body-secondary link-underline-light" to="/users/purchase">구매 내역</Link></li>
          <li><Link className="text-body-secondary link-underline-light" to="/users/sales">판매 내역</Link></li>
          <li><Link className="text-body-secondary link-underline-light" to="/users/wishlist/products">관심</Link></li>
        </ul>
        
        <h5 className="mt-5">내 정보</h5>
        <ul className="list-unstyled">
          <li><Link className="text-body-secondary link-underline-light" to="/users/manage_info">내 정보 관리</Link></li>
          <li><Link className="text-body-secondary link-underline-light" to="/users/address">주소록</Link></li>
          <li><Link className="text-body-secondary link-underline-light" to="/users/account">판매 정산 계좌</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;