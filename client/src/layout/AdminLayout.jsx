import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AdminSidebar from './AdminSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
