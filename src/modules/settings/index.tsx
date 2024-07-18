import {
  APP_SETTINGS_QUERY,
  AppSettingsQuery,
  COMPANY_SETTING_QUERY,
  ConfigInput,
  ShopifyInput,
  USERS_SETTINGS_QUERY,
} from '../../queries';
import {
  AppSettingsQueryResponse,
  AppSettingsResponse,
  ClientType,
  CompanySettingsResponse,
  SettingsResponse,
  UserSettingsResponse,
} from '../../index';
import {
  DELETE_COMPANY_SETTINGS_MUTATION,
  DELETE_USER_SETTINGS_MUTATION,
  SET_APP_SETTINGS_MUTATION,
  SET_COMPANY_SETTINGS_MUTATION,
  SET_USER_SETTINGS_MUTATION,
  SHOPIFY_SETUP,
} from '../../mutations';

export default class Settings {
  constructor(protected client: ClientType, protected key: string) {}

  async fetchAppSettings(): Promise<AppSettingsQueryResponse | undefined> {
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
    try {
      const { data } = await this.client.query<CompanySettingsResponse>({
        query: COMPANY_SETTING_QUERY,
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
  async setAppSettings(input: ConfigInput) {
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
    } catch (err){
      return undefined;
    }
  }
}
