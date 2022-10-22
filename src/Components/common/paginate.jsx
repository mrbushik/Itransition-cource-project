import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Paginate({ countCollections, currentPage, onPageChange }) {
  const pageCount = Math.ceil(countCollections / 3);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination m-3">
        {pages.map((page) => (
          <li
            key={'page_' + page}
            className={'page-item' + (page === currentPage ? ' active' : '')}>
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
Paginate.propTypes = {
  countCollections: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginate;
