import React from 'react';
import "../admin/BrandList.css"


const BrandSearchForm = ({ keyword, setKeyword }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`검색어: ${keyword}`);
    // 실제 검색 요청 로직을 추가합니다.
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <div className="input-group">
        <input 
          type="text" 
          name="keyword" 
          className="form-control" 
          placeholder="브랜드명 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">검색</button>
        </div>
      </div>
    </form>
  );
};

export default BrandSearchForm;

