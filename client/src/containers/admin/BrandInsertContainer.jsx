import React from 'react';
import BrandInsert from '../../components/admin/BrandInsert';
import { brandInsert } from '../../apis/admin/admin';
import "../../components/admin/css/BrandInsert.css";

const BrandInsertContainer = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // 폼 데이터를 FormData 객체로 수집

    try {
      // 브랜드 등록 API 호출
      const response = await brandInsert(formData);
      console.log('브랜드 등록 성공:', response.data);
    } catch (error) {
      console.error('브랜드 등록 실패:', error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="header">
        <h2>브랜드 등록</h2>
      </div>
      <BrandInsert onSubmit={handleSubmit} /> {/* BrandInsert 컴포넌트에 handleSubmit 핸들러 전달 */}
    </div>
  );
};

export default BrandInsertContainer;
