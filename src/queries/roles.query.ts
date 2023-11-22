import { gql } from '@apollo/client/core';

export const GET_ROLES = gql`
  query getRoles(
    $whereCondition: QueryRolesWhereWhereConditions
    $orderByCondition: [QueryRolesOrderByOrderByClause!]
  ) {
    roles(where: $whereCondition, orderBy: $orderByCondition) {
      data {
        id
        name
        title
        scope
      }
    }
  }
`;
