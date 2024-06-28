import React, { useState, useEffect } from 'react';
import IndexContainer from '../../containers/admin/IndexContainer';
import { getAdminDashboardData } from '../../apis/admin/admin';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const Index = () => {
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
    <>
      <Header />
      <IndexContainer 
        saleStateCounts={saleStateCounts} 
        purchaseStateCounts={purchaseStateCounts} 
      />
      <Footer />
    </>
  );
};

export default Index;
