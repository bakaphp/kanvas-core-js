import { gql } from "@apollo/client/core";

export const companiesQuery = gql`
  query($first: Int!, $page: Int!, $where: QueryCompaniesWhereWhereConditions, $orderBy: QueryCompaniesOrderByOrderByClause){
    companies(first: $first, page: $page, where: $where, orderBy: orderBy) {     
      data {
        id,
        name,
        website,
        address,
        zipcode,
        email,
        language,
        timezone,
        phone,
        country_code,
        created_at,
        updated_at
      },
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
`;

export const companyUserQuery = gql`
query($first: Int!, $page: Int!, $where: QueryCompaniesWhereWhereConditions, $orderBy: QueryCompaniesOrderByOrderByClause){
  companyUsers(first: $first, page: $page, where: $where, orderBy: orderBy) {     
    data {
      id,
      displayname,
      email,
      firstname,
      lastname,
      created_at, 
      updated_at,
    },
    paginatorInfo {
      currentPage
      lastPage
    }
  }
}
`;