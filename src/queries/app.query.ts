import { gql } from '@apollo/client/core';

export const GET_APP_USERS = gql`
  query getAppUsers(
    $first: Int
    $page: Int
    $whereCondition: QueryAppUsersWhereWhereConditions
    $orderBy: [QueryAppUsersOrderByOrderByClause!]
    $search: String
  ) {
    appUsers(
      first: $first
      page: $page
      where: $whereCondition
      orderBy: $orderBy
      search: $search
    ) {
      data {
        id
        uuid
        email
        displayname
        lastname
        firstname
        description
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
          user {
            firstname
            roles
          }
        }
        photo {
          url
        }
        branches {
          id
          name
          companies_id
        }
        social {
          total_message
          total_followers
          total_following
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
    apps(first: 100) {
      data {
        id
        name
        key
        default_apps_plan_id
        created_at
        total_users
        total_companies
        total_system_modules
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