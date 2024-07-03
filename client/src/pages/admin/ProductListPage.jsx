import React, { useState, useEffect } from 'react';
import ProductTable from '../../components/admin/ProductTable';
import Pagination from '../../components/admin/Pagination';
import ProductSearchForm from '../../components/admin/ProductSearchForm';
import { productList } from '../../apis/admin/admin';
import AdminLayout from '../../layout/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductListPage = () => {
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productList(keyword, currentPage, productsPerPage);
        const data = response.data;
        setProducts(data.productList || []);
        setTotalProducts(data.page.total);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProducts();
  }, [keyword, currentPage]);

  return (
    <AdminLayout>
      <div className="container mt-5">
        <div className="pagetitle">
          <p>상품 목록</p>
        </div>
        <ProductSearchForm keyword={keyword} setKeyword={setKeyword} />
        <ProductTable products={products} />
        <Pagination 
          currentPage={currentPage} 
          totalItems={totalProducts} 
          itemsPerPage={productsPerPage} 
          setCurrentPage={setCurrentPage} 
        />
      </div>
    </AdminLayout>
  );
};

export default ProductListPage;
