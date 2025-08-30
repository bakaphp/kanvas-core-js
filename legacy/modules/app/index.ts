import type {
  AllAppUsersInterface,
  AppActivateUser,
  AppCreateUserParams,
  AppDeactiveUser,
  AppUpdatePasswordInterface,
  AppUserInterface,
  AppWithAccessResponse,
  CreateAppInput,
  CreateAppResponse,
  CreatedAppCreateUser,
  OrderBy,
  WhereCondition,
} from "../../types";
import {
  APP_ACTIVE_USER,
  APP_CREATE_USER,
  APP_DEACTIVE_USER,
  CREATE_APP,
  USER_UPDATE_PASSWORD_MUTATION,
} from "../../mutations";
import { GET_APP_USERS, GET_APPS_WITH_ACCESS } from "../../queries";
import type { ClientType } from "../../__index";

class Users {
  constructor(protected client: ClientType) {}

  /**
   * Update user password as admin
   * @param uuid user uuid
   * @param password user password
   * @returns AppUpdatePasswordInterface object with a boolean value if the password was updated
   * @throws Error when adminKey or x-kanvas-key header is not provided in KanvasCore options
   */
  public async updatePassword(
    uuid: string,
    password: string,
  ): Promise<AppUpdatePasswordInterface> {
    const response = await this.client.mutate({
      mutation: USER_UPDATE_PASSWORD_MUTATION,
      variables: {
        uuid,
        password,
      },
    });

    return response.data;
  }

  /**
   * Get user by email
   * @param email user email address
   * @returns AppUserInterface object which contains the user data
   * @throws Error when adminKey or x-kanvas-key header is not provided in KanvasCore options
   */
  public async getUserByEmail(email: string): Promise<AppUserInterface> {
    const response = await this.client.query({
      query: GET_APP_USERS,
      variables: {
        whereCondition: {
          column: "EMAIL",
          operator: "EQ",
          value: email,
        },
        fetchPolicy: "network-only",
        partialRefetch: true,
      },
    });

    return response.data.appUsers.data[0];
  }

  public async getAppUsers(
    options: {
      first?: number;
      page?: number;
      whereCondition?: WhereCondition;
      orderBy?: OrderBy[];
      search?: string;
    } = {},
  ): Promise<AllAppUsersInterface> {
    const { first, page, whereCondition, orderBy, search } = options;

    const response = await this.client.query({
      query: GET_APP_USERS,
      variables: {
        first,
        page,
        whereCondition,
        orderBy,
        search,
      },
      fetchPolicy: "network-only",
      partialRefetch: true,
    });
    return response.data;
  }

  public async appCreateUser(
    data: AppCreateUserParams,
  ): Promise<CreatedAppCreateUser> {
    const response = await this.client.mutate({
      mutation: APP_CREATE_USER,
      variables: { data: data },
    });

    return response.data;
  }

  public async appActivateUser(
    user_id: number | string,
  ): Promise<AppActivateUser> {
    const response = await this.client.mutate({
      mutation: APP_ACTIVE_USER,
      variables: { user_id: user_id },
    });

    return response.data;
  }

  public async appDeactivateUser(
    user_id: number | string,
  ): Promise<AppDeactiveUser> {
    const response = await this.client.mutate({
      mutation: APP_DEACTIVE_USER,
      variables: { user_id: user_id },
    });

    return response.data;
  }
}

export class App {
  public users: Users;

  constructor(protected client: ClientType) {
    this.users = new Users(this.client);
  }

  public async createApp(input: CreateAppInput): Promise<CreateAppResponse> {
    const response = await this.client.mutate({
      mutation: CREATE_APP,
      variables: {
        input,
      },
      fetchPolicy: "network-only",
    });
    return response.data;
  }

  public async getAppsWithAccess(): Promise<AppWithAccessResponse> {
    const response = await this.client.query({
      query: GET_APPS_WITH_ACCESS,
      fetchPolicy: "network-only",
      partialRefetch: true,
    });
    return response.data;
  }
}
