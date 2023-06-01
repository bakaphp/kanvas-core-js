import { gql } from "@apollo/client/core";

export const createCompanyMutation = gql`
mutation($input : CompanyInput!) {
  createCompany(input: $input) {
    name,
    website,
    address,
    zipcode,
    email,
    language
  }
}
`;

export const updateCompanyMutation = gql`
mutation($id: Int!,$input: CompanyInput!) {
  updateCompany(id: $id, input: $input) {
    id,
    name,
    website,
    address,
    zipcode,
    email,
    language
  }
}
`;

export const deleteCompanyMutation = gql`
mutation ($id: Int!){
  deleteCompany(id: $id)
}
`;