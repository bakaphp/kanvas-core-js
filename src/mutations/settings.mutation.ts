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
