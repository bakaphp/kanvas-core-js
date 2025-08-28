import { gql } from '@apollo/client/core';

export const COMMENTS_QUERY = gql`
  query comments(
    $where: QueryCommentsWhereWhereConditions
    $first: Int!
    $page: Int
  ) {
    comments(where: $where, first: $first, page: $page) {
      data {
        comments {
          message
          id
          parent {
            id
            message
          }
        }
      }
      paginatorInfo {
        currentPage
        lastPage
        hasMorePages
      }
    }
  }
`;
