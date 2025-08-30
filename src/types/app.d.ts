type AsyncResponse<T = any> = T | Promise<T>;

export type HeaderConstructor = Record<string, () => string | Promise<string>>;
export interface CreateClientOptions {
  appKey: string;
  baseUrl: string;
  ssrMode?: boolean;
  locationKey: string;
  headers?: HeaderConstructor;
  credentials?: "same-origin" | "omit" | "include";
}

export interface CreateClientAdminOptions {
  appKey: string;
  baseUrl: string;
  adminKey: string;
  ssrMode?: boolean;
  locationKey: string;
  headers?: HeaderConstructor;
  credentials?: "same-origin" | "omit" | "include";
}
