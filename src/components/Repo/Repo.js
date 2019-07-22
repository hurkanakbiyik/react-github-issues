import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useGlobal from '../../store';

import './Repo.scss';
import { GITHUB_ACTION_STATUS } from '../../actions/github';
import Loading from '../Loading';
import FilterIssue from '../FilterIssue';
import Pagination from '../Pagination';
import Issues from '../Issues';

const RepoArea = ({ repo, filter: { field, direction, states } }) => (
  <div className="repo-area">
    <div className="repo-header">
      <a href={repo.owner.url} rel="noreferrer noopener" target="_blank"><h2>{repo.owner.login}</h2></a>
      <h2>/</h2>
      <a href={repo.projectsUrl} rel="noreferrer noopener" target="_blank"><h2>{repo.name}</h2></a>
    </div>
    <p>{repo.description}</p>
    <FilterIssue
      field={field}
      states={states}
      direction={direction}
      totalCount={repo.issues.totalCount}
      pageInfo={repo.issues.pageInfo}
    />
    <Issues issues={repo.issues.nodes} />
    <Pagination pageInfo={repo.issues.pageInfo} />
  </div>
);

RepoArea.defaultProps = {
  repo: {},
  filter: {
    field: '',
    direction: '',
  },
};

RepoArea.propTypes = {
  repo: PropTypes.shape({
    owner: PropTypes.shape({
      url: PropTypes.string,
    }),
    description: PropTypes.string,
  }),
  filter: PropTypes.shape({
    field: PropTypes.string,
    direction: PropTypes.string,
  }),
};

const Repo = () => {
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    globalActions.github.loadRepoWithIssues({});
  }, [globalActions.github]);

  const { status, repo, filter } = globalState;
  return (
    <div className="repo">
      {status === 'LOADING' && <Loading />}
      {status === GITHUB_ACTION_STATUS.SUCCESS && <RepoArea repo={repo} filter={filter} />}
    </div>
  );
};

export default Repo;
