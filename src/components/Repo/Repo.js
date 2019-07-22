import React, { useEffect } from 'react';

import useGlobal from '../../store';

import './Repo.scss';
import { GITHUB_ACTION_STATUS } from '../../actions/github';
import Loading from '../Loading';

const Repo = () => {
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    globalActions.github.loadRepoWithIssues();
  }, [globalActions.github]);

  const { status, repo } = globalState;
  return (
    <>
      {status === 'LOADING' && <Loading />}
      {status === GITHUB_ACTION_STATUS.SUCCESS && <span>{repo.name}</span>}
    </>
  );
};

export default Repo;
