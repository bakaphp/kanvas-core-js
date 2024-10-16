import {
  ADMIN_COMPANY_SETTING_QUERY,
  ADMIN_COMPANY_SETTINGS_QUERY,
  APP_SETTING_QUERY,
  APP_SETTINGS_QUERY,
  AppSettingsQuery,
  ConfigInput,
  USERS_SETTINGS_QUERY,
} from '../../queries';
import {
  AdminAppSettingsQueryResponse,
  AppSettingsResponse,
  ClientType,
  CompanySettingsResponse,
  SettingsResponse,
  ShopifyInput,
  UserSettingsResponse,
} from '../../index';
import {
  DELETE_APP_SETTINGS_MUTATION,
  DELETE_COMPANY_SETTINGS_MUTATION,
  DELETE_USER_SETTINGS_MUTATION,
  SET_APP_SETTINGS_MUTATION,
  SET_COMPANY_SETTINGS_MUTATION,
  SET_USER_SETTINGS_MUTATION,
  SHOPIFY_SETUP,
} from '../../mutations';

export default class Settings {
  constructor(protected client: ClientType, protected key: string) { }

  async appSettings(): Promise<AdminAppSettingsQueryResponse | undefined> {
    try {
      const { data } = await this.client.query({
        query: APP_SETTINGS_QUERY,
        fetchPolicy: 'network-only',
        partialRefetch: true,
      });
      return data;
    } catch {
      return undefined;
    }
  }

  async appSetting(name: string): Promise<any | undefined> {
    try {
      const { data } = await this.client.query({
        query: APP_SETTING_QUERY,
        variables: {
          key: name,
        },
        fetchPolicy: 'network-only',
        partialRefetch: true,
      });

      return data.adminAppSetting;
    } catch {
      return undefined;
    }
  }

  async fetchAppSettings(): Promise<AdminAppSettingsQueryResponse | undefined> {
    return this.appSettings();
  }

  /**
   * @deprecated
   */
  async getAppSettings(): Promise<SettingsResponse | undefined> {
    try {
      const {
        data: { getAppSettings },
      } = await this.client.query<AppSettingsResponse>({
        query: AppSettingsQuery,
        variables: { appKey: this.key },
        fetchPolicy: 'no-cache',
      });
      return getAppSettings;
    } catch {
      return undefined;
    }
  }

  async getCompanySettings(
    entity_uuid: string
  ): Promise<CompanySettingsResponse | undefined> {
    return this.companySettings(entity_uuid);
  }

  async companySettings(
    entity_uuid: string
  ): Promise<CompanySettingsResponse | undefined> {
    try {
      const { data } = await this.client.query<CompanySettingsResponse>({
        query: ADMIN_COMPANY_SETTINGS_QUERY,
        variables: {
          entityUUID: entity_uuid,
        },
        fetchPolicy: 'network-only',
        partialRefetch: true,
      });
      return data;
    } catch {
      return undefined;
    }
  }

  async companySetting(
    entity_uuid: string,
    key: string
  ): Promise<any | undefined> {
    try {
      const { data } = await this.client.query({
        query: ADMIN_COMPANY_SETTING_QUERY,
        variables: {
          entityUUID: entity_uuid,
          key: key
        },
        fetchPolicy: 'network-only',
        partialRefetch: true,
      });

      return data.adminCompanySetting;
    } catch {
      return undefined;
    }
  }

  async getUserSettings(
    entity_uuid: string
  ): Promise<UserSettingsResponse | undefined> {
    try {
      const { data } = await this.client.query({
        query: USERS_SETTINGS_QUERY,
        fetchPolicy: 'network-only',
        partialRefetch: true,
        variables: {
          entityUUID: entity_uuid,
        },
      });
      return data;
    } catch {
      return undefined;
    }
  }

  async setUserSettings(input: ConfigInput): Promise<boolean | undefined> {
    try {
      await this.client.mutate({
        mutation: SET_USER_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });
      return true;
    } catch {
      return undefined;
    }
  }
  async shopifySetup(input: ShopifyInput): Promise<boolean | undefined> {
    try {
      await this.client.mutate({
        mutation: SHOPIFY_SETUP,
        variables: {
          input,
        },
      });
      return true;
    } catch {
      return undefined;
    }
  }
  async setAppSetting(input: ConfigInput): Promise<boolean | undefined> {
    try {
      await this.client.mutate({
        mutation: SET_APP_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });
      return true;
    } catch {
      return undefined;
    }
  }

  async deleteAppSetting(key: String): Promise<boolean | undefined> {
    try {
      const { data } = await this.client.mutate({
        mutation: DELETE_APP_SETTINGS_MUTATION,
        variables: {
          key: key
        },
      });
      return data.deleteAppSetting;
    } catch {
      return undefined;
    }
  }

  /**
   * 
   * @deprecated
   */
  async setAppSettings(input: ConfigInput): Promise<boolean | undefined> {
    return this.setAppSetting(input);
  }

  async setCompanySettings(input: ConfigInput): Promise<boolean | undefined> {
    try {
      await this.client.mutate({
        mutation: SET_COMPANY_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });
      return true;
    } catch {
      return undefined;
    }
  }

  async deleteCompanySettings(
    input: ConfigInput
  ): Promise<boolean | undefined> {
    try {
      const response = await this.client.mutate({
        mutation: DELETE_COMPANY_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });
      return response.data.deleteCompanySetting;
    } catch {
      return undefined;
    }
  }
  async deleteUserSettings(input: ConfigInput): Promise<boolean | undefined> {
    try {
      const response = await this.client.mutate({
        mutation: DELETE_USER_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });
      return response.data.deleteUserSetting;
    } catch (err) {
      return undefined;
    }
  }
}
