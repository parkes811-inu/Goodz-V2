import React from 'react';
import ProductSearchForm from '../../components/admin/ProductSearchForm';
import ProductTable from '../../components/admin/ProductTable';
import Pagination from '../../components/admin/Pagination';

import 'bootstrap/dist/css/bootstrap.min.css'

const ProductListContainer = ({ keyword, setKeyword, page, brands, setCurrentPage }) => {
    return (
      <>
      <div className="container mt-5">
      
        <div className="d-flex justify-content-between mt-3 mb-3">
          <ProductSearchForm keyword={keyword} setKeyword={setKeyword} />
          <a href="/admin/add_brand" className="custom-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="24px" height="24px">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </a>
        </div>
        <div className="divider">
          <ProductTable brands={brands} />
        </div>
        <Pagination page={page} keyword={keyword} setCurrentPage={setCurrentPage} />
      </div>
      </>
    );
  };
  
  export default ProductListContainer;