import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddButton = ({ link }) => (
  <Link to={link} className="btn btn-outline-dark" style={{ padding: '6px 10px', fontSize: '16px', marginLeft: '500px'}}>
    +
  </Link>
);

export default AddButton;
