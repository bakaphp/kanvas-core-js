import { gql } from '@apollo/client';

export const GET_TOPICS = gql`
  query getTopics(
    $where: QueryGetTopicsWhereWhereConditions
    $orderBy: [QueryGetTopicsOrderByOrderByClause!]
    $search: String
    $first: Int
    $page: Int
  ) {
    getTopics {
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
