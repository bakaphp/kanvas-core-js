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
query adminCompanySettings($entityUUID: String!) {
  adminCompanySettings(entity_uuid: $entityUUID) {
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
      public
    }
  }
`;

export const APP_SETTINGS_QUERY = gql`
  query {
    adminAppSettings {
      key
      value
      public
    }
  }
`;

