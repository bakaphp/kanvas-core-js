import { gql } from '@apollo/client/core';

export const GET_ALL_AGENTS_QUERY = gql`
  query GetAgents($first: Int, $page: Int) {
    agents(
      first: $first
      page: $page
      orderBy: { column: CREATED_AT, order: DESC }
    ) {
      data {
        member_id
        name
        status {
          name
        }
        total_leads
        created_at
        user {
          displayname
          created_at
          contact {
            phone_number
            cell_phone_number
          }
        }
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
