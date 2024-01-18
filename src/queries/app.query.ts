import { gql } from '@apollo/client/core';

export const GET_APP_USERS = gql`
  query getAppUsers(
    $first: Int
    $page: Int
    $whereCondition: QueryAppUsersWhereWhereConditions
    $orderByCondition: [QueryAppUsersOrderByOrderByClause!]
    $search: String
  ) {
    appUsers(
      first: $first
      page: $page
      where: $whereCondition
      orderBy: $orderByCondition
      search: $search
    ) {
      data {
        id
        uuid
        email
        displayname
        lastname
        firstname
        default_company
        default_company_branch
        sex
        description
        user_active
        roles
        is_active
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

export const GET_APPS_WITH_ACCESS = gql`
  query {
    apps(first: 60) {
      data {
        id
        name
        key
        default_apps_plan_id
        created_at
        secrets {
          client_id
          client_secret_id
          name
          user {
            firstname
          }
        }
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
`;
