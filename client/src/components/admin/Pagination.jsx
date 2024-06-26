import React from 'react';
import "../admin/css/Pagination.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ currentPage, totalItems, itemsPerPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const page = {
    first: 1,
    prev: currentPage > 1 ? currentPage - 1 : 1,
    start: 1,
    end: totalPages,
    page: currentPage,
    next: currentPage < totalPages ? currentPage + 1 : totalPages,
    last: totalPages,
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageChange(page.first)}>&laquo;</button>
        </li>
        {page.page !== page.start && (
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(page.prev)}>&lt;</button>
          </li>
        )}
        {Array.from({ length: page.end - page.start + 1 }, (_, i) => i + page.start).map((no) => (
          page.page === no ? (
            <li className="page-item active" key={no}>
              <span className="page-link">{no}</span>
            </li>
          ) : (
            <li className="page-item" key={no}>
              <button className="page-link" onClick={() => handlePageChange(no)}>{no}</button>
            </li>
          )
        ))}
        {page.page !== page.last && (
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(page.next)}>&gt;</button>
          </li>
        )}
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageChange(page.last)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
