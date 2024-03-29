import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';

// overwrite accept */* header as graphiql will return html if application/json is not specified
// specifying headers for createHttpLink will just add, not overwrite
const overwriteHeadersFetch = (uri, options) => {
  const newOptions = options;
  newOptions.headers = {
    Accept: 'application/json',
    Authorization: 'Token a15011436fbfdb0f3128f5038ebe9a17bbb91580',
  };
  return fetch(uri, newOptions);
};

export const client = new ApolloClient({
  link: createHttpLink({
    fetch: overwriteHeadersFetch,
    uri: 'https://api.github.com/graphql',
  }),
  cache: new InMemoryCache(),
});


const QUERY = gql`
    query repoWithIssues($owner: String!, $name: String!, $field: IssueOrderField!, $direction: OrderDirection!, $after: String, $before: String, $states: [IssueState!]) {
        repository(owner: $owner, name: $name) {
            name
            description
            homepageUrl
            projectsUrl
            owner {
                login
                avatarUrl
                url
            }
            issues(first: 10, filterBy: {states: $states}, orderBy: {field: $field, direction: $direction}, after: $after, before: $before) {
                nodes {
                    url
                    title
                    closed
                    number
                    author {
                        login
                        url
                    }
                    timelineItems {
                        updatedAt
                    }
                }
                totalCount
                pageInfo {
                    endCursor
                    startCursor
                    hasPreviousPage
                    hasNextPage
                }
            }
        }
    }
`;

/**
 *
 * @param owner - repo owner
 * @param name - repo name
 * @param field
 * @param direction
 * @param after
 * @returns {Promise<ApolloQueryResult<any> | never>}
 */
export const fetchRepositoryWithIssues = ({
  owner, name, field, direction, after, states, before,
}) => client
  .query({
    variables: {
      owner,
      name,
      field,
      direction,
      after,
      states,
      before,
    },
    query: QUERY,
  })
  .then(res => res.data);
