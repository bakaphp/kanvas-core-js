import { gql } from '@apollo/client';

export const COMPANIES_BRANCHES_QUERY = gql`
  query branches(
    $where: QueryBranchesWhereWhereConditions
    $orderBy: [QueryBranchesOrderByOrderByClause!]
    $first: Int!
    $page: Int
  ) {
    branches(where: $where, orderBy: $orderBy, first: $first, page: $page) {
      data {
        id
        uuid
        company {
          id
          uuid
        }
        name
        email
        phone
        photo {
          id
          uuid
          name
          url
          type
          size
          field_name
        }
        zipcode
        is_default
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

export const COMPANIES_BRANCHES_USER_QUERY = gql`
  query companyBranchUsers(
    $where: QueryCompanyBranchUsersWhereWhereConditions
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
