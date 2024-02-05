import { gql } from '@apollo/client/core';

export const COUNTRIES_QUERY = gql`
  query(
    $first: Int
    $page: Int
    $where: QueryCountriesWhereWhereConditions
    $order: [QueryCountriesOrderByOrderByClause!]
  ) {
    countries(first: $first, page: $page, where: $where, orderBy: $order) {
      data {
        id
        name
        code
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

export const GET_STATES_BY_COUNTRY_QUERY = gql`
  query GetStatesByCountry(
    $first: Int!
    $where: QueryCountriesWhereWhereConditions
  ) {
    countries(first: $first, where: $where) {
      data {
        id
        states {
          id
          name
          code
          cities {
            name
            countries_id
          }
        }
      }
    }
  }
`;
