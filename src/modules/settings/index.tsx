import { AppSettingsQuery, CompanySettingsQuery } from "../../queries";
import { AppSettingsResponse, ClientType, CompanySettingsResponse, SettingsResponse } from "../../index";
import { Base } from "modules/base";

export default class Settings extends Base {
  constructor(client: ClientType, protected key: string) {
    super(client);
  }

  async getAppSettings(): Promise<SettingsResponse | undefined> {
    try {
      const { data: { getAppSettings } } = await this.client.query<AppSettingsResponse>({
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
      const { data: { companySettings } } = await this.client.query<CompanySettingsResponse>({
        query: CompanySettingsQuery,
        fetchPolicy: 'no-cache',
      });
      return companySettings;
    } catch {
      return undefined;
    }
  }
}