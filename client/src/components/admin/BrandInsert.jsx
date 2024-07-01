import React from 'react';
import "../admin/css/BrandInsert.css";

// 브랜드 등록 폼 컴포넌트
const BrandInsert = ({ onSubmit }) => {
    return (
      <form id="add_brand-form" onSubmit={onSubmit} enctype="multipart/form-data">
        <div className="form-group">
          <label htmlFor="brand-name">브랜드명</label>
          <input
            type="text"
            name="bName"
            id="brand-name"
            className="form-control rounded-0"
            placeholder="브랜드명을 입력해주세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand-logo">브랜드 로고</label>
          <input
            id="file"
            name="logoFile"
            className="form-control rounded-0"
            type="file"
            required
          />
        </div>
        <button type="submit" className="submit-btn">등록 완료</button>
      </form>
    );
  };

export default BrandInsert;
