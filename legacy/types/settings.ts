export interface SettingsResponse<T = any> {
  name: string;
  settings: T;
}

export interface AppSettingsResponse<T = any> {
  getAppSettings: SettingsResponse<T>;
}

export interface CompanySettingsResponse {
  adminCompanySettings: HashTableResponse[];
}

export interface UserSettingsResponse {
  userSettings: Array<{ key: string; value: any; public?: boolean }>;
}

export interface AppSettingsQueryResponse {
  appSettings: Array<{ key: string; value: any; public?: boolean }>;
}
export interface HashTableResponse {
  key: string;
  value: any;
  public?: boolean;
}

export interface AdminAppSettingsQueryResponse {
  adminAppSettings: HashTableResponse[];
}
