import { gql } from '@apollo/client';

export const CREATE_COMPANY_BRANCH = gql`
  mutation createCompanyBranch($input: CompanyBranchInput) {
    createCompanyBranch(input: $input) {
      id
      uuid
      company
      companies_id
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
  }
`;

export const UPDATE_COMPANY_BRANCH = gql`
    updateCompanyBranch($id: ID!, $input: CompanyBranchInput) {
        updateCompanyBranch(id: $id, input: $input) {
            id
            uuid
            company
            companies_id
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
    }
`;

export const DELETE_COMPANY_BRANCH = gql`
  mutation deleteCompanyBranch($id: ID!) {
    deleteCompanyBranch(id: $id)
  }
`;

export const ADD_USER_TO_BRANCH = gql`
  mutation addUserToBranch($id: ID!, $user_id: ID!) {
    addUserToBranch(id: $id, user_id: $user_id)
  }
`;

export const REMOVE_USER_FROM_BRANCH = gql`
    mutation removeUserFromBranch($id: ID!, user_id: ID!){
        removeUserFromBranch(id: $id, user_id: $user_id)
    }
`;
