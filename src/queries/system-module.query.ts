import { gql } from '@apollo/client/core';
export const SYSTEM_MODULES_QUERY = gql`
  query systemModels(
    $where: QuerySystemModelsWhereWhereConditions
    $orderBy: [QuerySystemModelsOrderByOrderByClause!]
    $first: Int!
    $page: Int
  ) {
    systemModels(where: $where, orderBy: $orderBy, first: $first, page: $page) {
      data {
        id
        uuid
        slug
        model_name
        parent {
          id
          uuid
          slug
          model_name
        }
        menu_order
        show
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;


