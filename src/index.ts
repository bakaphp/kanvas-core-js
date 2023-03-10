import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, RequestHandler, NormalizedCacheObject } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { Auth } from './modules'

type Middleware = (ApolloLink | RequestHandler);
export type ClientType = ApolloClient<NormalizedCacheObject>;

interface Options {
  url: string;
  key: string;
  middlewares?: Middleware[];
}

export function genericAuthMiddleware(authKey: string) {
  return setContext(async (_, context) => {
    const headers = {
      ...context.headers,
      'Authorization': authKey ? `Bearer ${authKey}` : '',
    }

    return { headers };
  }) 
}

export default class KanvasCore {
  public client: ClientType;

  public auth: Auth;
  
  constructor(protected options: Options) {
    this.client = new ApolloClient({
      link: this.generateLink(),
      cache: new InMemoryCache(),
    });

    this.auth = new Auth(this.client);
  }

  protected generateURL() {
    return new HttpLink({ uri: this.options.url });
  }

  protected generateMiddleware() {
    return new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => {
        return {
          headers: {
            ...headers,
            'X-Kanvas-App': this.options.key,
          },
        };
      });

      return forward(operation);
    });
  }

  protected generateLink(): ApolloLink {
    return ApolloLink.from([
      ...(this.options.middlewares || []),
      this.generateMiddleware(),
      this.generateURL(),
    ])
  }
}