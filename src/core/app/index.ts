import {
  CreateApolloClient,
  CreateHeaders,
  CreateMemoryCache,
  CreateUrl,
} from "setup/apollo";

import { CreateClientAdminOptions, CreateClientOptions } from "@/types/app";
import { isBrowser, isMobile } from "@/utils/check-environment";

export function createClient(options: CreateClientOptions) {
  const httpLink = CreateUrl({
    uri: options.baseUrl,
    credentials: options.credentials,
  });

  const httpHeaders = CreateHeaders({
    ...(options.headers ?? {}),
    "X-Kanvas-App": () => options.appKey,
    "X-Kanvas-Location": () => options.locationKey,
  });

  return CreateApolloClient({
    link: httpHeaders.concat(httpLink),
    cache: CreateMemoryCache(),
    ssrMode: options.ssrMode,
  });
}

export function createAdminClient(options: CreateClientAdminOptions) {
  if (isBrowser() || isMobile()) {
    throw new Error(
      "createAdminClient cannot be used in Browser or Mobile environments for security reasons, use createClient instead.",
    );
  }

  const httpLink = CreateUrl({
    uri: options.baseUrl,
    credentials: options.credentials,
  });

  const httpHeaders = CreateHeaders({
    ...(options.headers ?? {}),
    "X-Kanvas-App": () => options.appKey,
    "X-Kanvas-Key": () => options.adminKey,
    "X-Kanvas-Location": () => options.locationKey,
  });

  return CreateApolloClient({
    link: httpHeaders.concat(httpLink),
    cache: CreateMemoryCache(),
    ssrMode: options.ssrMode,
  });
}
