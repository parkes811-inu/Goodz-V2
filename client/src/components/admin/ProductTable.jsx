import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductTable = ({ products = [] }) => {
  console.log('Products: ', products);

  return (
    <div className="container mt-3">
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ width: '10%', color: 'black' }}>상품 번호</th>
            <th scope="col" style={{ width: '30%', color: 'black' }}>브랜드명</th>
            <th scope="col" style={{ width: '30%', color: 'black' }}>상품명</th>
            <th scope="col" style={{ width: '30%', color: 'black' }}>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">조회된 상품이 없습니다.</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.pno}>
                <th scope="row">{product.pno}</th>
                <td>{product.bname}</td>
                <td>
                  <Link to={`/admin/product/detail/${product.pno}`} className="text-dark text-decoration-none">
                    {product.productName}
                  </Link>
                </td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
