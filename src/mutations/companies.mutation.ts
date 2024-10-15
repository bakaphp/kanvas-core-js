import { gql } from '@apollo/client/core';
export const CREATE_COMPANY_MUTATION = gql`
  mutation($input: CompanyInput!) {
    createCompany(input: $input) {
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
  }
`;

export const UPDATE_COMPANY_MUTATION = gql`
  mutation updateCompany($id: ID!, $input: UpdateCompanyInput!) {
    updateCompany(id: $id, input: $input) {
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
  }
`;

export const DELETE_COMPANY_MUTATION = gql`
  mutation deleteCompany($id: ID!) {
    deleteCompany(id: $id)
  }
`;

export const ADD_USER_TO_COMPANY = gql`
  mutation addUserToCompany($id: ID!, $user_id: ID!, $rol_id: ID) {
    addUserToCompany(id: $id, user_id: $user_id, rol_id: $rol_id)
  }
`;

export const REMOVE_USER_FROM_COMPANY = gql`
  mutation removeUserFromCompany($id: ID!, $user_id: ID!) {
    removeUserFromCompany(id: $id, user_id: $user_id)
  }
`;
