import React, { useEffect } from 'react';

import useGlobal from '../../store';

import './Repo.scss';
import { GITHUB_ACTION_STATUS } from '../../actions/github';

const Repo = () => {
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    globalActions.github.loadRepoWithIssues();
  }, [globalActions.github]);

  const { status, repo } = globalState;
  return (
    <>
      {status === 'LOADING' && <h4>Loading...</h4>}
      {status === GITHUB_ACTION_STATUS.SUCCESS && <span>{repo.name}</span>}
    </>
  );
};

export default Repo;
