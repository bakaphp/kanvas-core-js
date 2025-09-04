import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
  query GetCountries(
    $first: Int
    $page: Int
    $where: QueryCountriesWhereWhereConditions
    $orderBy: [QueryCountriesOrderByOrderByClause!]
    $search: String
  ) {
    countries(
      first: $first
      page: $page
      where: $where
      orderBy: $orderBy
      search: $search
    ) {
      data {
        id
        name
        flag
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
            id
            name
            countries_id
          }
        }
      }
    }
  }
`;

export const GET_STATES = gql`
  query GetStates(
    $first: Int
    $page: Int
    $where: QueryStatesWhereWhereConditions
    $orderBy: [QueryStatesOrderByOrderByClause!]
    $search: String
  ) {
    states(
      first: $first
      page: $page
      where: $where
      orderBy: $orderBy
      search: $search
    ) {
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
