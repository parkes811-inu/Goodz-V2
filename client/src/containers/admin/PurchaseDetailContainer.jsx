import React, { useEffect, useState } from 'react';
import PurchaseDetail from '../../components/admin/PurchaseDetail';
import { userSale } from '../../apis/admin/admin';
import 'bootstrap/dist/css/bootstrap.min.css';


const PurchaseDetailContainer = ({ saleNo }) => {
  const [saleDetail, setSaleDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaleDetail = async () => {
      try {
        console.log("Fetching sale detail for saleNo:", saleNo); // 디버깅을 위해 추가
        const response = await userSale(saleNo);
        console.log("API response:", response.data.saleDetail); // API 응답 로그 추가
        setSaleDetail(response.data.saleDetail);
      } catch (error) {
        console.error("Error fetching sale detail:", error); // 에러 로그 추가
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleDetail();
  }, [saleNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return saleDetail ? <PurchaseDetail saleDetail={saleDetail} /> : <div>No data available</div>;
};

export default PurchaseDetailContainer;
