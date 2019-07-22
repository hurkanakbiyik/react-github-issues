import React from 'react';
import PropTypes from 'prop-types';
import './Issues.scss';

const Issues = ({ issues }) => (
  <div className="issues">
    {issues.map(issue => (
      <a
        href={issue.url}
        rel="noreferrer noopener"
        target="_blank"
        key={issue.number}
        className="issue"
      >
        <span>{`#${issue.number}`}</span>
        <div className="title">{issue.title}</div>
      </a>
    ))}
  </div>
);

Issues.defaultProps = {
  issues: [],
};

Issues.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
};

export default Issues;
