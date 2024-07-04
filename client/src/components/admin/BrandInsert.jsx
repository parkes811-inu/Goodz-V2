import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import 합니다.
import "../admin/css/BrandInsert.css"

// 브랜드 등록 폼 컴포넌트
const BrandInsert = ({ onSubmit }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 방지합니다.
    if(onSubmit) {
      onSubmit(event); // 부모 컴포넌트로부터 받은 onSubmit 함수를 실행합니다.
    }
    navigate('/admin/brands'); // 폼 제출 후에 /admin/brands 경로로 이동합니다.
  };

  return (
    <form id="add_brand-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="brand-insert-group" >
        <label htmlFor="brand-name">브랜드명</label>
        <input
          type="text"
          name="bName"
          id="brand-name"
          className="form-control rounded-1.5"
          placeholder="브랜드명을 입력해주세요"
          required
        />
      </div>
      <div className="brand-insert-group">
        <label htmlFor="brand-logo">브랜드 로고</label>
        <input
          name="logoFile"
          className="form-control rounded-1.5"
          type="file"
          required
        />
      </div>
      <div style={ {marginBottom : '300px'}}>

       <button type="submit" className="btn btn-dark btn-block my-4 w-100" style={{ backgroundColor: '#393E46'}}>등록</button>
      </div>
    </form>
  );
};

export default BrandInsert;
