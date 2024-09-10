import { gql } from '@apollo/client/core';

export const GET_TAGS = gql`
  query(
    $first: Int
    $page: Int
    $where: QueryTagsWhereWhereConditions
    $search: String
  ) {
    tags(first: $first, page: $page, where: $where, search: $search) {
      data {
        id
        user {
          id
        }
        slug
        name
        weight
        created_at
        updated_at
      }
    }
  }
`;
