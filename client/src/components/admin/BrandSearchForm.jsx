import React from 'react';
import AddButton from './AddButton';

const BrandSearchForm = ({ keyword, setKeyword }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`검색어: ${keyword}`);

  };

  return (
    <form onSubmit={handleSubmit} className="form-inline" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="input-group" style={{ width: '300px' }}>
        <input 
          type="text" 
          name="keyword" 
          className="form-control" 
          placeholder="브랜드명 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-dark">검색</button>
        </div>
      </div>
      <AddButton link="/admin/add_brand" />
    </form>
  );
};

export default BrandSearchForm;
