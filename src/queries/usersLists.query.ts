import { gql } from '@apollo/client/core';

export const GET_USERS_LISTS = gql`
  query getUsersLists(
    $where: QueryGetUsersListsWhereWhereConditions
    $orderBy: [QueryGetUsersListsOrderByOrderByClause!]
    $first: Int! = 25
    $page: Int
  ) {
    getUsersLists(
      where: $where
      orderBy: $orderBy
      first: $first
      page: $page
    ) {
      data {
        id
        slug
        name
        description
        is_public
        is_default
        user {
          id
        }
        company {
          id
          uuid
          name
        }
        items {
          id
          uuid
          message
          user {
            id
            uuid
            displayname
            email
          }
        }
      }
    }
  }
`;
