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
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      uuid
      firstname
      lastname
      displayname
      contact {
        phone_number
        cell_phone_number
      }
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
      roles
      abilities
      custom_fields {
        data {
          name
          value
        }
      }
    }
  }
`;


export const INVITE_USER_MUTATION = gql`
 mutation( $input: InviteInput!){
    inviteUser(input: $input){
        id
        email,
        invite_hash
    }
}
`;