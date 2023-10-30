import { gql } from '@apollo/client/core';

export const APP_USERS_QUERY = gql`
  query filterUser($first: Int, $where: QueryAppUsersWhereWhereConditions) {
    appUsers(first: $first, where: $where) {
      data {
        id
        uuid
        email
        displayname
        lastname
        firstname
        sex
        description
        user_active
        address {
          address_1
          address_2
          city {
            id
            name
            latitude
            longitude
            states_id
            countries_id
          }
          country {
            id
            name
            code
            flag
          }
          zip_code
          state {
            id
            code
            name
          }
        }
        contact {
          phone_number
          cell_phone_number
        }
        companies {
          id
          uuid
          name
        }
        branches {
          id
          name
          companies_id
        }
        created_at
        updated_at
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
`;

export const GET_ALL_APP_USERS = gql`
  query getAllAppUser($where: QueryAppUsersWhereWhereConditions) {
    appUsers(where: $where) {
      data {
        id
        uuid
        firstname
        lastname
        displayname
        email
        user_active
        created_at
        updated_at
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
