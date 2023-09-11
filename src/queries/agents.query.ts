import { gql } from '@apollo/client/core';

export const GET_ALL_AGENTS_QUERY = gql`
  query GetAgents($first: Int, $page: Int) {
    agents(first: $first, page: $page) {
      data {
        member_id,
        name,
        user {
            displayname
        }
      paginatorInfo {
        currentPage
        perPage
        firstItem
        lastItem
        total
        count
        lastPage
        hasMorePages
      }
    }
  }
`;
