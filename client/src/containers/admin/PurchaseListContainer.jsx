import React from 'react';
import Pagination from '../../components/admin/Pagination';
import '../../components/admin/css/History.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchaseTable from '../../components/admin/PurchaseTable';
import PurchaseState from '../../components/admin/PurchaseState';

const PurchaseListContainer = ({ salesStateCounts, userSaleList, currentPage, totalSales, salesPerPage, setCurrentPage }) => {
  return (
    <div className="container mt-5">
      <div className="header">
        <h2>구매내역</h2>
      </div>
      <PurchaseState salesStateCounts={salesStateCounts} />
      <PurchaseTable userSaleList={userSaleList} />
      <Pagination 
        currentPage={currentPage} 
        totalItems={totalSales} 
        itemsPerPage={salesPerPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

export default PurchaseListContainer;
