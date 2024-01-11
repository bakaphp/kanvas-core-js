import {
  APP_SETTINGS_QUERY,
  AppSettingsQuery,
  CompanySettingsQuery,
  ConfigInput,
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
import { SET_USER_SETTINGS_MUTATION } from '../../mutations';

export default class Settings {
  constructor(protected client: ClientType, protected key: string) {}

  async fetchAppSettings(): Promise<AppSettingsQueryResponse | undefined> {
    try {
      const { data } = await this.client.query({
        query: APP_SETTINGS_QUERY,
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

  async getCompanySettings(): Promise<SettingsResponse | undefined> {
    try {
      const {
        data: { companySettings },
      } = await this.client.query<CompanySettingsResponse>({
        query: CompanySettingsQuery,
        fetchPolicy: 'no-cache',
      });
      return companySettings;
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
        fetchPolicy: 'no-cache',
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
}
