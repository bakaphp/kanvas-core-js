import { gql } from '@apollo/client/core';

export const PEOPLE_QUERY = gql`
  query peoples(
    $where: QueryPeoplesWhereWhereConditions
    $orderBy: [QueryPeoplesOrderByOrderByClause!]
    $first: Int
    $page: Int
  ) {
    peoples(
      where: $where
      orderBy: $orderBy
      first: $first
      page: $page
    ) {
      data {
        id
        uuid
        name
        firstname
        lastname
        company {
          id
          name
        }
        user {
          id
          firstname
          lastname
          displayname
        }
        contacts {
          type {
            name
          }
          value
        }
        address {
          address
          city
        }
        custom_fields {
          data {
            name
            value
          }
        }
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
      }
    }
  }
`;
