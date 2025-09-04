import { gql } from "@apollo/client";

export interface ConfigInput {
  entity_uuid: string;
  public?: boolean;
  key: string;
  value: any;
}

export const AppSettingsQuery = gql`
  query getAppSettings($appKey: String!) {
    getAppSettings(key: $appKey) {
      name
      settings
    }
  }
`;

export const ADMIN_COMPANY_SETTINGS_QUERY = gql`
query adminCompanySettings($entityUUID: String!) {
  adminCompanySettings(entity_uuid: $entityUUID) {
    key
    value
    public
  }
}
`;

export const ADMIN_COMPANY_SETTING_QUERY = gql`
  query adminCompanySetting($entityUUID: String!, $key: String!) {
    adminCompanySetting(entity_uuid: $entityUUID, key: $key)
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

export const APP_SETTING_QUERY = gql`
  query adminAppSetting($key: String!) {
    adminAppSetting(key: $key)
  }
`;
