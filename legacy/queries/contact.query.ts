import { gql } from '@apollo/client/core';

export const GET_CONTACT_TYPES = gql`
  query(
    $where: QueryContactTypeWhereWhereConditions
    $orderBy: [QueryContactTypeOrderByOrderByClause!]
    $first: Int
    $page: Int
  ) {
    contactType(where: $where, orderBy: $orderBy, first: $first, page: $page) {
      data {
        id
        name
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
