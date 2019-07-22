import React from 'react';
import PropTypes from 'prop-types';
import './FilterIssue.scss';

const orderFields = [
  {
    label: 'Creation Time',
    value: 'CREATED_AT',
  },
  {
    label: 'Update Time',
    value: 'UPDATED_AT',
  },
  {
    label: 'Comment count',
    value: 'COMMENTS',
  },
];
const directionFields = [
  {
    label: 'Ascending',
    value: 'ASC',
  },
  {
    label: 'Descending',
    value: 'DESC',
  },
];

const FilterGroup = ({ options, filter, selectedValue }) => (
  <div className="filter-group">
    {options.map(option => (
      <button
        key={option.value}
        onClick={() => filter(option.value)}
        type="button"
        className={selectedValue !== option.value ? 'filter-button' : 'filter-button-selected'}
      >
        {option.label}
      </button>
    ))}
  </div>
);

FilterGroup.defaultProps = {
  options: [],
  filter: () => {},
  selectedValue: '',
};

FilterGroup.propTypes = {
  options: PropTypes.arrayOf({ label: PropTypes.string, value: PropTypes.string }),
  filter: PropTypes.func,
  selectedValue: PropTypes.string,
};

const FilterIssue = ({ totalCount, field, direction }) => (
  <div className="filter-issue">
    <div className="total">
      {`${totalCount} issues`}
    </div>
    <div className="filters">
      <FilterGroup
        selectedValue={field}
        options={orderFields}
        filter={val => console.log(val)}
      />
      <FilterGroup
        selectedValue={direction}
        options={directionFields}
        filter={val => console.log(val)}
      />
    </div>
  </div>
);

FilterIssue.defaultProps = {
  totalCount: 0,
  field: '',
  direction: '',
};

FilterIssue.propTypes = {
  totalCount: PropTypes.number,
  direction: PropTypes.string,
  field: PropTypes.string,
};

export default FilterIssue;