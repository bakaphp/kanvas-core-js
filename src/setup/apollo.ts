import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
} from "@apollo/client";

import { SetContextLink } from "@apollo/client/link/context";
import { HeaderConstructor } from "@/types/app";
import { getHeadersFromBuilder } from "@/utils";

export const CreateApolloClient = (
  options: ApolloClient.Options,
) => {
  const client = new ApolloClient(options);

  return client;
};

export const CreateMemoryCache = (config?: InMemoryCacheConfig | undefined) =>
  new InMemoryCache(config);

export const CreateUrl = (options?: HttpLink.Options | undefined) =>
  new HttpLink(options);

export function CreateHeaders(
  headers: HeaderConstructor,
) {
  return new SetContextLink(async (prevContext) => {
    const newHeaders = await getHeadersFromBuilder(headers);

    return {
      ...prevContext,
      headers: {
        ...prevContext.headers,
        ...newHeaders,
      },
    };
  });
}
