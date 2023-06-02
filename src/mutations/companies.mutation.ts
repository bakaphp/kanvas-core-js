import { gql } from "@apollo/client/core";

export const createCompanyMutation = gql`
  mutation($input : CompanyInput!) {
    createCompany(input: $input) {
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


export const createCompaniesBranchMutation = gql`
  mutation($input: CompanyBranchInput!) {
    createCompaniesBranch(input: $input) {
      id,
      name,
      is_default,
      companies_id,
      email,
      phone
    }
  }
`;

export const updateCompaniesBranchMutation = gql`
  mutation($id: Int!, $input: CompanyBranchInput!) {
    updateCompanyBranch(id: $id, input: $input) {
      id,
      name,
      is_default,
      companies_id,
      email,
      phone
    }
  }
`;

export const deleteCompanyBranchMutation = gql`
  mutation ($id: Int!){
    deleteCompanyBranch(id: $id)
  }
`;

export const addUserToBranchMutation = gql`
  mutation($id: Int!, $users_id: Int!) {
    addUserToBranch(id: $id, users_id: $users_id)
  }
`;

export const removeUserToBranchMutation = gql`
  mutation($id: Int!, $users_id: Int!) {
    removeUserFromBranch(id: $id, users_id: $users_id)
  }
`;