import React from 'react';
import PayState from '../../components/admin/PayState';
import PayTable from '../../components/admin/PayTable';
import Pagination from '../../components/admin/Pagination';
import '../../components/admin/css/History.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PayListContainer = ({ purchaseStateCounts, userPurchaseList, currentPage, totalPurchases, purchasesPerPage, setCurrentPage }) => {
  return (
    <div className="container mt-5">
      <div className="header">
        <h2>판매내역</h2>
      </div>
      <PayState purchaseStateCounts={purchaseStateCounts} />
      <PayTable userPurchaseList={userPurchaseList} />
      <Pagination 
        currentPage={currentPage} 
        totalItems={totalPurchases} 
        itemsPerPage={purchasesPerPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

export default PayListContainer;
