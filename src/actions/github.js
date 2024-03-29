import { fetchRepositoryWithIssues } from '../graphql/github';

export const GITHUB_ACTION_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  LOADING: 'LOADING',
};


export const loadRepoWithIssues = async (store, {
  field = 'CREATED_AT', direction = 'DESC', states = 'OPEN', after, before,
}) => {
  store.setState({ status: GITHUB_ACTION_STATUS.LOADING });
  try {
    const response = await fetchRepositoryWithIssues({
      owner: 'tensorflow',
      name: 'tfjs',
      field,
      direction,
      states,
      after,
      before,
    });
    const repo = response.repository;
    store.setState({
      repo,
      status: GITHUB_ACTION_STATUS.SUCCESS,
      filter: {
        field,
        direction,
        states,
        after,
        before,
      },
    });
  } catch (error) {
    store.setState({ status: GITHUB_ACTION_STATUS.FAIL });
  }
};
