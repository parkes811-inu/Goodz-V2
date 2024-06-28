import React from 'react';
import BrandSearchForm from '../../components/admin/BrandSearchForm';
import BrandTable from '../../components/admin/BrandTable';
import Pagination from '../../components/admin/Pagination';
import "../../components/admin/BrandList.css"
import 'bootstrap/dist/css/bootstrap.min.css'



const BrandListContainer = ({ keyword, setKeyword, page, brands, setCurrentPage }) => {
    return (
      <div>
        <div className="header">
          <h2>브랜드 목록</h2>
      </div>
        <div className="d-flex justify-content-between mt-3 mb-3">
          <BrandSearchForm keyword={keyword} setKeyword={setKeyword} />
          <a href="/admin/add_brand" className="custom-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="24px" height="24px">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </a>
        </div>
        <div className="divider">
          <BrandTable brands={brands} />
        </div>
        <Pagination page={page} keyword={keyword} setCurrentPage={setCurrentPage} />
      </div>
    );
  };
  
  export default BrandListContainer;