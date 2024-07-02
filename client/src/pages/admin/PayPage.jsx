import React, { useState, useEffect } from 'react';
import { userPurchaseList } from '../../apis/admin/admin';
import AdminLayout from '../../layout/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

import PayListContainer from '../../containers/admin/PayListContainer';

const PayPage = () => {
  const [purchaseStateCounts, setPurchaseStateCounts] = useState({});
  const [userPurchaseListData, setUserPurchaseListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const purchasesPerPage = 10;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await userPurchaseList(currentPage, purchasesPerPage);
        const data = response.data;
        setUserPurchaseListData(data.purchaseList || []);
        setPurchaseStateCounts(data.purchaseStateCounts || {});
        setTotalPurchases(data.page.total);
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };

    fetchPurchases();
  }, [currentPage]);

  return (
    <AdminLayout>
      <PayListContainer
        purchaseStateCounts={purchaseStateCounts}
        userPurchaseList={userPurchaseListData}
        currentPage={currentPage}
        totalPurchases={totalPurchases}
        purchasesPerPage={purchasesPerPage}
        setCurrentPage={setCurrentPage}
      />
    </AdminLayout>
  );
};

export default PayPage;
