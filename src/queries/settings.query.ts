import { gql } from '@apollo/client/core';

export type ConfigInput = {
  key: string;
  value: any;
  entity_uuid: string;
  public?: boolean
};

export const AppSettingsQuery = gql`
  query getAppSettings($appKey: String!) {
    getAppSettings(key: $appKey) {
      name
      settings
    }
  }
`;

export const COMPANY_SETTING_QUERY = gql`
query companySetting($entityUUID: String!) {
  companySetting(entity_uuid: $entityUUID) {
    key
    value
    public
  }
}
`;

export const USERS_SETTINGS_QUERY = gql`
  query userSettings($entityUUID: String!) {
    userSettings(entity_uuid: $entityUUID) {
      key
      value
    }
  }
`;

export const APP_SETTINGS_QUERY = gql`
  query {
    appSettings {
      key
      value
      public
    }
  }
`;
