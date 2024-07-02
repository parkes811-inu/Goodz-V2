import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PurchaseTable = ({ userSaleList = [] }) => {
  console.log("sales : ", userSaleList);
  return (
    <div className="divider">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">판매번호</th>
            <th scope="col">상품번호</th>
            <th scope="col">유저ID</th>
            <th scope="col">운송장번호</th>
            <th scope="col">상태</th>
            <th scope="col">결제일자</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {userSaleList.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">판매된 상품이 없습니다.</td>
            </tr>
          ) : (
            userSaleList.map((sales) => (
              <tr key={sales.s_no}>
                <th scope="row">
                  <a href={`/admin/purchase/detail/${sales.s_no}`} className="text-dark text-decoration-none">
                    {sales.s_no}
                  </a>
                </th>
                <td>{sales.p_no}</td>
                <td>{sales.user_id}</td>
                <td>{sales.sales_tracking_no}</td>
                <td>{sales.sale_state === 'pending' ? '판매요청' :
                      sales.sale_state === 'reception' ? '수취완료' :
                      sales.sale_state === 'checking' ? '검수중' :
                      sales.sale_state === 'completed' ? '정산완료' : '취소'}</td>
                <td>{new Date(sales.sale_date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
