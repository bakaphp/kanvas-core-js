import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, RequestHandler, NormalizedCacheObject } from "@apollo/client/core";
import { App, Auth, Users, CustomFields } from './modules';
import { setContext } from '@apollo/client/link/context';

export * from './types';

type Middleware = ApolloLink | RequestHandler;
export type ClientType = ApolloClient<NormalizedCacheObject>;

interface Options {
  url: string;
  key: string;
  middlewares?: Middleware[];
  adminKey?: string;
}

export function genericAuthMiddleware(fn: () => Promise<string | null | undefined>) {
  return setContext(async (_, context) => {
    const key = await fn();

    const headers = {
      ...context.headers,
      'Authorization': key ? `Bearer ${key}` : '',
    }

    return { headers };
  })
}

export default class KanvasCore {
  public client: ClientType;
  public auth: Auth;
  public users: Users;
  public customFields: CustomFields;
  public app: App;

  constructor(protected options: Options) {
    this.client = new ApolloClient({
      link: this.generateLink(),
      cache: new InMemoryCache(),
    });

    this.app = new App(this.client);
    this.auth = new Auth(this.client);
    this.users = new Users(this.client);
    this.customFields = new CustomFields(this.client);
  }

  protected generateURL() {
    return new HttpLink({ uri: this.options.url });
  }

  protected generateMiddleware() {
    return setContext(async (_, context) => {
      const headers = {
        ...context.headers,
        'X-Kanvas-App': this.options.key,
      }
      if (this.options.adminKey) {
        headers['X-Kanvas-Key'] = this.options.adminKey;
      }
      return { headers }
    })
  }

  protected generateLink(): ApolloLink {
    return ApolloLink.from([
      ...(this.options.middlewares || []),
      this.generateMiddleware(),
      this.generateURL(),
    ])
  }
}
