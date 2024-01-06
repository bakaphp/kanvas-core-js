import {
  AppSettingsQuery,
  CompanySettingsQuery,
  ConfigInput,
  USERS_SETTINGS_QUERY,
} from '../../queries';
import {
  AppSettingsResponse,
  ClientType,
  CompanySettingsResponse,
  SettingsResponse,
  userSettingsResponse,
} from '../../index';
import { SET_USER_SETTINGS_MUTATION } from '../../mutations';

export default class Settings {
  constructor(protected client: ClientType, protected key: string) {}

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
  ): Promise<userSettingsResponse | undefined> {
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
      const data = this.client.mutate({
        mutation: SET_USER_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });
      console.log(data);
      // return data;
      return true;
    } catch {
      return undefined;
    }
  }
}
