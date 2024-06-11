import { gql } from '@apollo/client/core';

export const GET_TAGS = gql`
  query($where: QueryTagsWhereWhereConditions) {
    tags(where: $where) {
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
