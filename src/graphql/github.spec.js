import { fetchRepositoryWithIssues } from './github';

const queryParams = {
  owner: 'tensorflow',
  name: 'tfjs',
  field: 'CREATED_AT',
  direction: 'DESC',
  after: null,
};

describe('# github graphql', () => {
  describe('## [query] fetchRepositoryWithIssues', () => {
    it('should repository data', async () => {
      const data = await fetchRepositoryWithIssues(queryParams);
      expect(data.repository.issues.nodes.length).toBe(10);
    });
  });
});
