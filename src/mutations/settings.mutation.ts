import { gql } from '@apollo/client/core';

export const SET_USER_SETTINGS_MUTATION = gql`
  mutation setUserSetting($input: ModuleConfigInput!) {
    setUserSetting(input: $input)
  }
`;

export const SET_APP_SETTINGS_MUTATION = gql`
  mutation setAppSetting($input: ModuleConfigInput!) {
    setAppSetting(input: $input)
  }
`;

export const SET_COMPANY_SETTINGS_MUTATION = gql`
  mutation setCompanySetting($input: ModuleConfigInput!) {
    setCompanySetting(input: $input)
  }
`;

export const DELETE_COMPANY_SETTINGS_MUTATION = gql`
  mutation deleteCompanySetting($input: ModuleConfigInput!) {
    deleteCompanySetting(input: $input)
  }
`;

export const DELETE_USER_SETTINGS_MUTATION = gql`
  mutation deleteUserSetting($input: ModuleConfigInput!) {
    deleteUserSetting(input: $input)
  }
`;
