import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  RequestHandler,
  NormalizedCacheObject,
} from '@apollo/client/core';
import {
  App,
  Auth,
  Users,
  CustomFields,
  Locations,
  Leads,
  Inventory,
  Agents,
  Cart,
  Order,
  UsersInteractions
} from './modules';

import { setContext } from '@apollo/client/link/context';
import Settings from './modules/settings';

export * from './types';
export * from './queries';
export * from './mutations';
export * from './modules';

type Middleware = ApolloLink | RequestHandler;
export type ClientType = ApolloClient<NormalizedCacheObject>;

interface Options {
  url: string;
  key: string;
  middlewares?: Middleware[];
  adminKey?: string;
}

export function genericAuthMiddleware(
  fn: () => Promise<string | null | undefined>
) {
  return setContext(async (_, context) => {
    const key = await fn();

    const headers = {
      ...context.headers,
      Authorization: key ? `Bearer ${key}` : '',
    };

    return { headers };
  });
}

export function locationMiddleware(
  fn: () => Promise<string | null | undefined>
) {
  return setContext(async (_, context) => {
    const key = await fn();

    const headers = {
      ...context.headers,
      ...(key && { 'X-Kanvas-Location': key }),
    };

    return { headers };
  });
}

export default class KanvasCore {
  public client: ClientType;
  public auth: Auth;
  public users: Users;
  public customFields: CustomFields;
  public app: App;
  public settings: Settings;
  public locations: Locations;
  public leads: Leads;
  public inventory: Inventory;
  public userInteraction: UsersInteractions;
  public agents: Agents;
  public cart: Cart;
  public order: Order

  constructor(protected options: Options) {
    this.client = new ApolloClient({
      link: this.generateLink(),
      cache: new InMemoryCache(),
    });

    this.app = new App(this.client);
    this.auth = new Auth(this.client);
    this.users = new Users(this.client);
    this.customFields = new CustomFields(this.client);
    this.settings = new Settings(this.client, this.options.key);
    this.locations = new Locations(this.client);
    this.leads = new Leads(this.client);
    this.inventory = new Inventory(this.client)
    this.userInteraction = new UsersInteractions(this.client);
    this.inventory = new Inventory(this.client);
    this.agents = new Agents(this.client);
    this.cart = new Cart(this.client);
    this.order = new Order(this.client)
  }

  protected generateURL() {
    return new HttpLink({ uri: this.options.url });
  }

  protected generateMiddleware() {
    return setContext(async (_, context) => {
      const headers = {
        ...context.headers,
        'X-Kanvas-App': this.options.key,
        ...(this.options.adminKey && { 'X-Kanvas-Key': this.options.adminKey }),
      };
      return { headers };
    });
  }

  protected generateLink(): ApolloLink {
    return ApolloLink.from([
      ...(this.options.middlewares || []),
      this.generateMiddleware(),
      this.generateURL(),
    ]);
  }
}
