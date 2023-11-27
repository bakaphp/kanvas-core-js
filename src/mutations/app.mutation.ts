import { gql } from '@apollo/client/core';

export const USER_UPDATE_PASSWORD_MUTATION = gql`
  mutation appUserUpdatePassword($uuid: String!, $password: String!) {
    appUserUpdatePassword(uuid: $uuid, password: $password)
  }
`;

export const MULTIPLE_UPLOAD_FILES = gql`
  mutation multiUpload($files: [Upload!]!) {
    multiUpload(files: $files) {
      id
      name
      url
    }
  }
`;

export const APP_CREATE_USER = gql`
  mutation appCreateUser($data: CreateUserInput!) {
    appCreateUser(data: $data) {
      id
      uuid
      firstname
      lastname
      displayname
      default_company
      default_company_branch
      email
      contact {
        phone_number
        cell_phone_number
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
      roles
    }
  }
`;

export const APP_ACTIVE_USER = gql`
  mutation($user_id: ID!) {
    appActivateUser(user_id: $user_id)
  }
`;

export const APP_DEACTIVE_USER = gql`
  mutation appDeActiveUser($user_id: ID!) {
    appDeActiveUser(user_id: $user_id)
  }
`;
