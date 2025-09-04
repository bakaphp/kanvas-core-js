import {
  CreateApolloClient,
  CreateHeaders,
  CreateMemoryCache,
  CreateUrl,
} from "setup/apollo";

import {
  Client,
  CreateClientAdminOptions,
  CreateClientOptions,
} from "@/types/app";

import { getHeadersFromBuilder, pathJoin } from "@/utils";
import { isBrowser } from "@/utils/check-environment";
import { CreateAxiosClient } from "@/setup/axios";

export function createClient(options: CreateClientOptions): Client {
  options.apiVersion ??= "graphql";

  const uri = pathJoin([options.baseUrl, options.apiVersion]);

  const httpLink = CreateUrl({
    credentials: options.credentials,
    uri,
  });

  const defaultHeaders = {
    ...(options.headers ?? {}),
    "X-Kanvas-App": () => options.appKey,
  };

  const httpHeaders = CreateHeaders(defaultHeaders);

  const apollo = CreateApolloClient({
    link: httpHeaders.concat(httpLink),
    cache: CreateMemoryCache(),
    ssrMode: options.ssrMode,
  });

  const axios = CreateAxiosClient({
    baseURL: options.baseUrl,
    headers: {
      "X-Kanvas-App": options.appKey,
    },
  });

  axios.interceptors.request.use(async (config) => {
    const headers = await getHeadersFromBuilder(defaultHeaders);

    for (const key in headers) {
      config.headers.set(key, headers[key], true);
    }

    return config;
  });

  // @ts-expect-error
  return {
    ...apollo,
    axios,
  };
}

export function createAdminClient(options: CreateClientAdminOptions): Client {
  if (isBrowser()) {
    throw new Error(
      "createAdminClient cannot be used in Browser environments for security reasons, use createClient instead.",
    );
  }

  options.apiVersion ??= "graphql";

  const uri = pathJoin([options.baseUrl, options.apiVersion]);

  const httpLink = CreateUrl({
    credentials: options.credentials,
    uri,
  });

  const defaultHeaders = {
    ...(options.headers ?? {}),
    "X-Kanvas-App": () => options.appKey,
    "X-Kanvas-Key": () => options.adminKey,
  };

  const httpHeaders = CreateHeaders(defaultHeaders);

  const apollo = CreateApolloClient({
    link: httpHeaders.concat(httpLink),
    cache: CreateMemoryCache(),
    ssrMode: options.ssrMode,
  });

  const axios = CreateAxiosClient({
    baseURL: options.baseUrl,
    headers: {
      "X-Kanvas-App": options.appKey,
      "X-Kanvas-Key": options.adminKey,
    },
  });

  axios.interceptors.request.use(async (config) => {
    const headers = await getHeadersFromBuilder(defaultHeaders);

    for (const key in headers) {
      config.headers.set(key, headers[key], true);
    }

    return config;
  });

  // @ts-expect-error
  return {
    ...apollo,
    axios,
  };
}
