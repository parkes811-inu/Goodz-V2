import React from 'react';
import { Link } from 'react-router-dom';
import "../admin/css/Index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexCard = ({ title, link, children }) => (
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <span>{title}</span>
      <Link to={link}>더보기 &gt;</Link>
    </div>
    <div className="card-body">
      {children}
    </div>
  </div>
);

export default IndexCard;
