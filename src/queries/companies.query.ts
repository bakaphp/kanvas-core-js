import { gql } from '@apollo/client/core';

export const COMPANIES_QUERY = gql`
  query companies(
    $where: QueryCompaniesWhereWhereConditions
    $orderBy: [QueryCompaniesOrderByOrderByClause!]
    $first: Int
    $page: Int
    $search: String
  ) {
    companies(
      where: $where
      orderBy: $orderBy
      first: $first
      page: $page
      search: $search
    ) {
      data {
        id
        name
        uuid
        website
        address
        zipcode
        email
        language
        timezone
        phone
        country_code
        created_at
        updated_at
        is_active
        total_users
        photo {
          id
          uuid
          name
          url
          type
          size
          field_name
        }
        user {
          id
          firstname
          lastname
          displayname
        }
        groups {
          id
          name
        }
        branches {
          id
          uuid
          name
        }
      }
      paginatorInfo {
        count
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
`;

export const COMPANY_USERS_QUERY = gql`
  query companyUsers(
    $where: QueryCompanyUsersWhereWhereConditions
    $first: Int
    $page: Int
    $orderBy: [QueryCompanyUsersOrderByOrderByClause!]
  ) {
    companyUsers(where: $where, first: $first, page: $page, orderBy:$orderBy) {
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
        custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
          data {
            name
            value
          }
        }
        photo {
          url
        }
        created_at
        updated_at
      }
      paginatorInfo {
        count
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
`;

export const COMPANY_SETTINGS_QUERY = gql`
  query companySettings {
    companySettings {
      name
      settings
    }
  }
`;
