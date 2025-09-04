import { gql } from "@apollo/client/core";

export const GET_TOPICS = gql`
  query getTopics(
    $where: QueryGetTopicsWhereWhereConditions
    $orderBy: [QueryGetTopicsOrderByOrderByClause!]
    $search: String
    $first: Int
    $page: Int
  ) {
    getTopics(
        where: $where
        orderBy: $orderBy
        search: $search
        first: $first
        page: $page
    ) {
      data {
        id
        name
        slug
        weight
        is_feature
        status
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;
