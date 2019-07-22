import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';


const Pagination = ({ pageInfo: { endCursor, startCursor } }) => (
  <div className="pagination">
    {endCursor}
    {' / '}
    {startCursor}
  </div>
);

Pagination.defaultProps = {
  pageInfo: {
    endCursor: '',
    startCursor: '',
  },
};

Pagination.propTypes = {
  pageInfo: {
    endCursor: PropTypes.string,
    startCursor: PropTypes.string,
  },
};

export default Pagination;
