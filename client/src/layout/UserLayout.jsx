import React from 'react';
import Header from './Header';
import Footer from './Footer';
import UserSidebar from './UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <UserSidebar />
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

export default UserLayout;
