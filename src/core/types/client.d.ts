type AsyncResponse<T = any> = T | Promise<T>;

export interface CreateClientOptions {
    key: string;
    admin?: string;
    baseUrl: string;
    ssrMode?: boolean;
    credentials?: "same-origin" | "omit" | "include";
    // headers?: {
    //     token: () => AsyncResponse<string>;
    //     location: () => AsyncResponse<string>;
    //     identifier: () => AsyncResponse<string>;
    // };
}
