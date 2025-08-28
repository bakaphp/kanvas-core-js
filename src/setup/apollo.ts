import {
    ApolloClient,
    ApolloClientOptions,
    HttpLink,
    HttpOptions,
    InMemoryCache,
    InMemoryCacheConfig,
} from "@apollo/client";

export const CreateApolloClient = <TCacheShape = any>(
    options: ApolloClientOptions<TCacheShape>,
) => new ApolloClient(options);

export const GetMemoryCache = (config?: InMemoryCacheConfig | undefined) =>
    new InMemoryCache(config);

export const GetUrl = (options?: HttpOptions | undefined) =>
    new HttpLink(options);
