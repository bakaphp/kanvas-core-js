import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
} from "@apollo/client";

import { SetContextLink } from "@apollo/client/link/context";
import { Client, HeaderConstructor } from "@/types/app";

export const CreateApolloClient = (
  options: ApolloClient.Options,
) => {
  const client: Client = new ApolloClient(options);

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
    const newHeaders = Object.fromEntries(
      await Promise.all(
        Object.entries(headers).map(async ([key, fn]) => [key, await fn()]),
      ),
    );

    return {
      ...prevContext,
      headers: {
        ...prevContext.headers,
        ...newHeaders,
      },
    };
  });
}
