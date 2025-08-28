import { CreateApolloClient, GetMemoryCache, GetUrl } from "setup/apollo";
import { CreateClientOptions } from "core/types/client";

export function createClient(options: CreateClientOptions) {
    return CreateApolloClient({
        cache: GetMemoryCache(),
        link: GetUrl({
            uri: options.baseUrl,
            credentials: options.credentials,
        }),
    });
}

export const client = createClient({
    baseUrl: "",
    key: "",
});

console.log(client);
