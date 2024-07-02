import React, { useState } from 'react';
import BrandInsert from '../../components/admin/BrandInsert';
import { brandInsert } from '../../apis/admin/admin'; // API 호출 함수

const BrandInsertContainer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // 요청 중인지 상태 관리

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    if (isSubmitting) return; // 이미 요청 중이면 중단

    setIsSubmitting(true); // 요청 중으로 상태 변경

    const formData = new FormData(event.target); // 폼 데이터를 FormData 객체로 수집합니다.

    try {
      const response = await brandInsert(formData); // 브랜드 등록 API 호출
      console.log('브랜드 등록 성공:', response.data);
      alert("브랜드가 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error('브랜드 등록 실패:', error);
      alert("브랜드 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false); // 요청 완료 후 상태 초기화
    }
  };

  return (
    <div className="container">
      <div className="pagetitle">
        <p>브랜드 등록</p>
      </div>
      <BrandInsert onSubmit={handleSubmit} /> {/* BrandInsert 컴포넌트에 handleSubmit 핸들러를 전달합니다. */}
    </div>
  );
};

export default BrandInsertContainer;
