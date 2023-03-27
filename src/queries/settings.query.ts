import { gql } from '@apollo/client';

export const AppSettingsQuery = gql`
  query getAppSettings($appKey: String!) {
    getAppSettings(key: $appKey) {
      name,
      settings
    }
  }
`;


export const CompanySettingsQuery = gql`
  query getCompanySettings {
    companySettings {
      name,
      settings
    }
  }
`;