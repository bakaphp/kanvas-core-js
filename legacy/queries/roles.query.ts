import { gql } from '@apollo/client/core';

export const GET_ROLES = gql`
  query getRoles(
    $where: QueryRolesWhereWhereConditions
    $orderBy: [QueryRolesOrderByOrderByClause!]
    $search: String
  ) {
    roles(where: $where, orderBy: $orderBy, search: $search) {
      data {
        id
        name
        title
        scope
        userCount
        abilitiesCount
        systemRole
      }
      paginatorInfo {
        count
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
`;
