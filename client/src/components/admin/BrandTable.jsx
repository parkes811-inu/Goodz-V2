import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/BrandList.css';

const BrandTable = ({ brands = [] }) => {
  console.log('Brands:', brands); // 데이터 확인

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" style={{ width: '120px' }}>브랜드 번호</th>
          <th scope="col" colSpan="4">브랜드명</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {brands.length === 0 ? (
          <tr>
            <td colSpan="2" align="center">조회된 브랜드가 없습니다.</td>
          </tr>
        ) : (
          brands.map((brand) => (
            <tr key={brand.bNo}> 
              <th scope="row">{brand.bNo}</th> 
              <td>{brand.bName}</td> 
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default BrandTable;
