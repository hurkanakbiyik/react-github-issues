import React from 'react';
import PropTypes from 'prop-types';
import useGlobal from '../../store';

import './Pagination.scss';


const Pagination = ({
  pageInfo: {
    endCursor, startCursor, hasPreviousPage, hasNextPage,
  },
}) => {
  const [globalState, globalActions] = useGlobal();
  return (
    <div className="pagination">
      {hasPreviousPage && (
      <button
        className="pagination-button"
        type="button"
        onClick={() => globalActions.github.loadRepoWithIssues(
          { ...globalState.filter, after: null, before: startCursor },
        )}
      >
        {'Previous'}
      </button>
      )}
      {hasNextPage
      && (
      <button
        className="pagination-button"
        type="button"
        onClick={() => globalActions.github.loadRepoWithIssues(
          { ...globalState.filter, before: null, after: endCursor },
        )}
      >
        {'Next'}
      </button>
      )}
    </div>
  );
};
Pagination.defaultProps = {
  pageInfo: {
    endCursor: '',
    startCursor: '',
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    endCursor: PropTypes.string,
    startCursor: PropTypes.string,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
  }),
};

export default Pagination;
