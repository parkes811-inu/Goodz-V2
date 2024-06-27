import React, { useState, useEffect } from 'react';
import BrandTable from '../../components/admin/BrandTable';
import Pagination from '../../components/admin/Pagination';
import BrandSearchForm from '../../components/admin/BrandSearchForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/admin/BrandList.css';

const BrandListPage = () => {
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [totalBrands, setTotalBrands] = useState(0);
  const brandsPerPage = 10;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`/admin/brands?keyword=${keyword}&page=${currentPage}&limit=${brandsPerPage}`);
        const data = await response.json();
        console.log('Fetched data:', data); // 데이터 확인
        setBrands(data.brandList || []);
        setTotalBrands(data.page.total);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };

    fetchBrands();
  }, [keyword, currentPage]);

  const totalPages = Math.ceil(totalBrands / brandsPerPage);
  const page = {
    first: 1,
    prev: currentPage > 1 ? currentPage - 1 : 1,
    start: 1,
    end: totalPages,
    page: currentPage,
    next: currentPage < totalPages ? currentPage + 1 : totalPages,
    last: totalPages
  };

  return (
    <div className="content mt-5">
      <BrandSearchForm keyword={keyword} setKeyword={setKeyword} />
      <BrandTable brands={brands} />
      <Pagination page={page} keyword={keyword} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default BrandListPage;
