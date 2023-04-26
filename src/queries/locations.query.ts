import { gql } from '@apollo/client/core';

export const COUNTRIES_QUERY = gql`
  query {
    countries(first: 250, orderBy: [{ column: ID, order: ASC }]) {
      data {
        id
        name
        code
      }
      paginatorInfo {
        currentPage
        lastPage
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
