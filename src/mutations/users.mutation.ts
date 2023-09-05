import { gql } from '@apollo/client/core';

export const REGISTER_MUTATTION = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      user {
        id
        displayname
        uuid
      }
      token {
        token
        refresh_token
        token_expires
        refresh_token_expires
        time
        timezone
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($data: ForgotPasswordInput!) {
    forgotPassword(data: $data)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
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
  }
`;

export const INVITE_USER_MUTATION = gql`
  mutation($input: InviteInput!) {
    inviteUser(input: $input) {
      id
      email
      invite_hash
    }
  }
`;

export const SWITCH_COMPANY_BRANCH_MUTATION = gql`
  mutation switchCompanyBranch($company_branch_id: Int!) {
    switchCompanyBranch(company_branch_id: $company_branch_id)
  }
`;
