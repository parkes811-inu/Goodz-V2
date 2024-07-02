import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BrandTable = ({ brands = [] }) => {
  console.log('Brands:', brands); // 데이터 확인

  return (
    <div className="container mt-3">
      <table className="table table-bordered text-center">
      <thead className="table-dark">
        <tr>
          <th scope="col" style={{ width: '120px' , color : 'black'}}>브랜드 번호</th>
          <th scope="col" colSpan="4" style={{color : 'black'}}>브랜드명</th>
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
    </div>
  );
};

export default BrandTable;
