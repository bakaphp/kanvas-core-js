import { gql } from '@apollo/client/core';

export const PEOPLE_QUERY = gql`
  query peoples(
    $where: QueryPeoplesWhereWhereConditions
    $orderBy: [QueryPeoplesOrderByOrderByClause!]
    $first: Int
    $page: Int
    $hasEmails: QueryPeoplesHasEmailsWhereHasConditions
    $hasPhones: QueryPeoplesHasPhonesWhereHasConditions
    $hasTags: QueryPeoplesHasTagsWhereHasConditions
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
      hasTags: $hasTags
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
        tags {
          data {
            id
            name
            slug
            name
            weight
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
