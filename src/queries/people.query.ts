import { gql } from '@apollo/client/core';

export const PEOPLE_QUERY = gql`
  query peoples(
    $where: QueryPeoplesWhereWhereConditions
    $orderBy: [QueryPeoplesOrderByOrderByClause!]
    $first: Int
    $page: Int
    $hasEmails: QueryPeoplesHasEmailsWhereHasConditions
    $hasPhones: QueryPeoplesHasPhonesWhereHasConditions
    $hasCustomFields: QueryPeoplesHasCustomFieldsWhereHasConditions
    $search: String
  ) {
    peoples(
      where: $where
      orderBy: $orderBy
      search: $search
      first: $first
      page: $page
      hasEmails: $hasEmails
      hasPhones: $hasPhones
      hasCustomFields: $hasCustomFields
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
