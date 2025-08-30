import { gql } from "@apollo/client/core";

export const GET_TAGS = gql`
  query(
    $first: Int
    $page: Int
    $where: QueryTagsWhereWhereConditions
    $orderBy: [QueryTagsOrderByOrderByClause!]
    $search: String
  ) {
    tags(first: $first, page: $page, where: $where, search: $search, orderBy: $orderBy) {
      data {
        id
        user {
          id
        }
        slug
        name
        weight
        is_feature
        created_at
        updated_at
      }
    }
  }
`;
