import React from 'react';
import { Link } from 'react-router-dom';

const IndexAction = ({ link, label }) => (
  <div className="col-md-6 d-flex justify-content-center">
    <div className="action text-center">
      <Link to={link} className="p-0" style={{color: 'black', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black', padding: '5px', borderRadius: '4px', textDecoration: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="150px" height="150px">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Link>
      <p>{label}</p>
    </div>
  </div>
);

export default IndexAction;
