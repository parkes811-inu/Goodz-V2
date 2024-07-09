import React, { useEffect, useState } from 'react';

const SizeChart = ({ category }) => {
  const [sizeTableHtml, setSizeTableHtml] = useState('');

  useEffect(() => {
    const fetchSizeTable = async () => {
      try {
        const response = await fetch(`/product/size_table?category=${category}`);
        const html = await response.text();
        setSizeTableHtml(html);
      } catch (error) {
        console.error('Error loading size table:', error);
      }
    };

    fetchSizeTable();
  }, [category]);

  const showCm = () => {
    const cmTable = document.querySelector('.cm-table');
    const inchesTable = document.querySelector('.inches-table');
    cmTable.style.display = 'table';
    inchesTable.style.display = 'none';
  };

  const showInches = () => {
    const cmTable = document.querySelector('.cm-table');
    const inchesTable = document.querySelector('.inches-table');
    cmTable.style.display = 'none';
    inchesTable.style.display = 'table';
  };

  return (
    <div className="row mt-5 chart-container" id="sizeInfo">
      <h5 className="text-md-start fw-bold" style={{ paddingRight: 100 }}>Size Info</h5>
      <div id="sizeTableContainer" className="d-flex align-items-start p-4" dangerouslySetInnerHTML={{ __html: sizeTableHtml }} />
      {category !== 'accessory' && (
        <div className="toggle-buttons">
          <button onClick={showCm}>cm</button>
          <button onClick={showInches}>inches</button>
        </div>
      )}
    </div>
  );
};

export default SizeChart;
