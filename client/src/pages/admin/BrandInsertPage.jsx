import React from 'react';
import BrandInsertContainer from '../../containers/admin/BrandInsertContainer';
import AdminLayout from '../../layout/AdminLayout';
const BrandInsertPage = () => {
  return (
    <>
    <AdminLayout>
    <div className="container mt-5">
      <BrandInsertContainer />
    </div>
    </AdminLayout> 
    </>
  );
};

export default BrandInsertPage;
