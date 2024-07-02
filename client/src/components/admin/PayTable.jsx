import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PayTable = ({ userPurchaseList = [] }) => {
  console.log("Purchase : ", userPurchaseList);
  return (
    <div className="divider">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">구매번호</th>
            <th scope="col">상품번호</th>
            <th scope="col">유저ID</th>
            <th scope="col">상태</th>
            <th scope="col">결제일자</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {userPurchaseList.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">판매된 상품이 없습니다.</td>
            </tr>
          ) : (
            userPurchaseList.map((purchase) => (
              <tr key={purchase.purchase_no}>
                <th scope="row">
                  <Link to={`/admin/pay_history/detail/${purchase.purchase_no}`} className="text-dark text-decoration-none">
                    {purchase.purchase_no}
                  </Link>
                </th>
                <td>{purchase.p_no}</td>
                <td>{purchase.user_id}</td>
                <td>{purchase.purchase_state === 'pending' ? '결제대기' :
                      purchase.purchase_state === 'paid' ? '결제완료' :
                      purchase.purchase_state === 'ready_to_ship' ? '배송대기' :
                      purchase.purchase_state === 'shipping' ? '배송중' :
                      purchase.purchase_state === 'delivered' ? '배송완료' : '취소'}</td>
                <td>{new Date(purchase.orderedAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayTable;
