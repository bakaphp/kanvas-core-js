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
        employment_history {
          end_date
          id
          income
          organization {
            id
            uuid
            name
          }
          income_type
          position
          start_date
          status
          people {
            id
            name
            uuid
          }
        }
        created_at
        updated_at
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

export const PEOPLE_COUNT = gql`
  query peopleCount {
    peopleCount
  }
`;

export const PEOPLE_COUNT_BY_TAG = gql`
  query peopleCountByTag($tag: String!) {
    peopleCountByTag(tag: $tag)
  }
`;
