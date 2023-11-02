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

export const APP_CRTEATE_USER = gql`
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
