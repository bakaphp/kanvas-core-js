import { gql } from '@apollo/client/core';

export type ConfigInput = {
  key: string;
  value: any;
  entity_uuid: string;
};

export const AppSettingsQuery = gql`
  query getAppSettings($appKey: String!) {
    getAppSettings(key: $appKey) {
      name
      settings
    }
  }
`;

export const CompanySettingsQuery = gql`
  query getCompanySettings {
    companySettings {
      name
      settings
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
