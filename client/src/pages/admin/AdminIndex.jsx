import React, { useState, useEffect } from 'react';
import IndexContainer from '../../containers/admin/IndexContainer';
import { getAdminDashboardData } from '../../apis/admin/admin';
import AdminLayout from '../../layout/AdminLayout';

const AdminIndex = () => {
  const [saleStateCounts, setSaleStateCounts] = useState({});
  const [purchaseStateCounts, setPurchaseStateCounts] = useState({});

  useEffect(() => {
    // Fetch admin dashboard data
    getAdminDashboardData()
      .then(response => {
        const data = response.data;
        setSaleStateCounts(data.saleStateCounts);
        setPurchaseStateCounts(data.purchaseStateCounts);
      })
      .catch(error => {
        console.error('Error fetching admin dashboard data:', error);
      });
  }, []);

  return (
    <AdminLayout>
      <IndexContainer 
        saleStateCounts={saleStateCounts} 
        purchaseStateCounts={purchaseStateCounts} 
      />
    </AdminLayout>
  );
};

export default AdminIndex;
