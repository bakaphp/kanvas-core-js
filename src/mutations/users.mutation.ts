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

export const GET_INVITE_MUTATION = gql`
  mutation($hash: String!) {
    getInvite(hash: $hash) {
      email
      invite_hash
      firstname
      lastname
    }
  }
`;

export const PROCESS_INVITE_MUTATION = gql`
  mutation processInvite($input: CompleteInviteInput!) {
    processInvite(input: $input) {
      id
      email
    }
  }
`;

export const DELETE_INVITE_MUTATION = gql`
  mutation deleteInvite($id: Int!) {
    deleteInvite(id: $id)
  }
`;

export const SWITCH_COMPANY_BRANCH_MUTATION = gql`
  mutation switchCompanyBranch($company_branch_id: Int!) {
    switchCompanyBranch(company_branch_id: $company_branch_id)
  }
`;
