import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddButton = ({ link }) => (
  <Link to={link} className="btn btn-outline-dark" style={{ padding: '5px 10px', marginLeft: '480px', fontSize: 'px' }}>
    +
  </Link>
);

export default AddButton;
