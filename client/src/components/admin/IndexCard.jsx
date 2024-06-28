import React from 'react';
import "../admin/Index.css"

const IndexCard = ({ title, link, children }) => (
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <span>{title}</span>
      <a href={link}>더보기 &gt;</a>
    </div>
    <div className="card-body">
      {children}
    </div>
  </div>
);

export default IndexCard;