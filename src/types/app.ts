import { ApolloClient } from "@apollo/client";
import { Axios, AxiosInstance } from "axios";

type AsyncResponse<T = any> = T | Promise<T>;

export type HeaderConstructor = Record<string, () => AsyncResponse<string>>;

export interface CreateClientOptions {
  appKey: string;
  baseUrl: string;
  ssrMode?: boolean;
  apiVersion?: string;
  headers?: HeaderConstructor;
  credentials?: "same-origin" | "omit" | "include";
  axios?: {
    interceptors: Axios["interceptors"];
  };
}

export interface CreateClientAdminOptions extends CreateClientOptions {
  adminKey: string;
}

export type Client =
  & Omit<
    ApolloClient,
    | "__actionHookForDevTools"
    | "__requestRaw"
    | "cache"
    | "defaultContext"
    | "defaultOptions"
    | "devtoolsConfig"
    | "documentTransform"
    | "getMemoryInternals"
    | "link"
    | "localState"
    | "disableNetworkFetches"
    | "reFetchObservableQueries"
    | "version"
    | "queryDeduplication"
    | "prioritizeCacheValues"
  >
  & { axios: AxiosInstance };
