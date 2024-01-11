import { gql } from '@apollo/client/core';

export const COMPANIES_QUERY = gql`
  query companies(
    $where: QueryCompaniesWhereWhereConditions
    $orderBy: [QueryCompaniesOrderByOrderByClause!]
    $first: Int
    $page: Int
  ) {
    companies(where: $where, orderBy: $orderBy, first: $first, page: $page) {
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
    $first: Int!
    $page: Int
  ) {
    data {
      id
      uuid
      firstname
      lastname
      displayname
      default_company
      default_company_branch
      email
      branches {
        id
        name
        phone
      }
      companies {
        id
        name
      }
      contact {
        phone_number
        cell_phone_number
      }
      roles
      abilities
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
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
`;

export const COMPANY_SETTINGS_QUERY = gql`
  query companySettings {
    companySettings {
      name
      settings
    }
  }
`;
