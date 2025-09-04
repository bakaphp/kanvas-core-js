import { gql } from "@apollo/client/core";

export const COMPANIES_BRANCHES_QUERY = gql`
  query branches(
    $where: QueryBranchesWhereWhereConditions
    $orderBy: [QueryBranchesOrderByOrderByClause!]
    $first: Int
    $page: Int
    $search: String
  ) {
    branches(
      where: $where
      orderBy: $orderBy
      first: $first
      page: $page
      search: $search
    ) {
      data {
        id
        uuid
        company {
          id
          uuid
        }
        user {
          id
          firstname
          lastname
          displayname
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
        total_users
        address
        is_active
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
  query(
    $where: QueryCompanyBranchUsersWhereWhereConditions
    $first: Int
    $page: Int
    $search: String
  ) {
    companyBranchUsers(where: $where, first: $first, page: $page) {
      data {
        id
        uuid
        firstname
        lastname
        displayname
        default_company
        default_company_branch
        email
        address {
          address_1
          address_2
          zip_code
        }
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
  }
`;
