export interface SettingsResponse<T = any> {
  name: string;
  settings: T;
}

export interface AppSettingsResponse<T = any> {
  getAppSettings: SettingsResponse<T>;
}

export interface CompanySettingsResponse<T = any> {
  companySettings: SettingsResponse<T>;
}

export interface UserSettingsResponse {
  userSettings: Array<{ key: string; value: any }>;
}

export interface AppSettingsQueryResponse {
  appSettings: Array<{ key: string; value: any; public?: boolean }>;
}
