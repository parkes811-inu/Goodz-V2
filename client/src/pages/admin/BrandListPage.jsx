import React, { useState, useEffect } from 'react';
import BrandTable from '../../components/admin/BrandTable';
import Pagination from '../../components/admin/Pagination';
import BrandSearchForm from '../../components/admin/BrandSearchForm';
import { list } from '../../apis/admin/admin';
import AdminLayout from '../../layout/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';


const BrandListPage = () => {
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [totalBrands, setTotalBrands] = useState(0);
  const brandsPerPage = 10;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await list(keyword, currentPage, brandsPerPage);
        const data = response.data;
        setBrands(data.brandList || []);
        setTotalBrands(data.page.total);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };

    fetchBrands();
  }, [keyword, currentPage]);

  return (
    <AdminLayout>
      <div className="container mt-5">
      <div className="pagetitle">
        <p>브랜드 목록</p>
      </div>
        <BrandSearchForm keyword={keyword} setKeyword={setKeyword} />
        <BrandTable brands={brands} />
        <Pagination 
          currentPage={currentPage} 
          totalItems={totalBrands} 
          itemsPerPage={brandsPerPage} 
          setCurrentPage={setCurrentPage} 
        />
      </div>
    </AdminLayout>
  );
};

export default BrandListPage;
