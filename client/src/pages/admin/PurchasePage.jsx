import React, { useState, useEffect } from 'react';
import { userSaleList } from '../../apis/admin/admin';
import AdminLayout from '../../layout/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/admin/css/History.css';
import PurchaseListContainer from '../../containers/admin/PurchaseListContainer';

const PurchasePage = () => {
  const [salesStateCounts, setSalesStateCounts] = useState({});
  const [userSaleListData, setUserSaleListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSales, setTotalSales] = useState(0);
  const salesPerPage = 10;

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await userSaleList(currentPage, salesPerPage);
        const data = response.data;
        setUserSaleListData(data.saleList || []);
        setSalesStateCounts(data.saleStateCounts || {});
        setTotalSales(data.page.total);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSales();
  }, [currentPage]);

  return (
    <AdminLayout>
      <PurchaseListContainer
        salesStateCounts={salesStateCounts}
        userSaleList={userSaleListData}
        currentPage={currentPage}
        totalSales={totalSales}
        salesPerPage={salesPerPage}
        setCurrentPage={setCurrentPage}
      />
    </AdminLayout>
  );
};

export default PurchasePage;
