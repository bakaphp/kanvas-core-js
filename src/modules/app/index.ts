import type { AppUserInterface, AppUpdatePasswordInterface, WhereCondition, AllAppUsersInterface, OrderBy, AppCreateUserParams, CreatedAppCreateUser } from '../../types';
import { APP_CRTEATE_USER, USER_UPDATE_PASSWORD_MUTATION } from '../../mutations';
import { APP_USERS_QUERY, GET_ALL_APP_USERS } from '../../queries';
import type { ClientType } from '../../index';

class Users {
  constructor(protected client: ClientType) { }

  /**
   * Update user password as admin
   * @param uuid user uuid
   * @param password user password
   * @returns AppUpdatePasswordInterface object with a boolean value if the password was updated
   * @throws Error when adminKey or x-kanvas-key header is not provided in KanvasCore options
   * */
  public async updatePassword(
    uuid: string,
    password: string
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
   * */
  public async getUserByEmail(email: string): Promise<AppUserInterface> {
    const response = await this.client.query({
      query: APP_USERS_QUERY,
      variables: {
        first: 1,
        where: {
          column: 'EMAIL',
          operator: 'EQ',
          value: email,
        },
      },
    });

    return response.data.appUsers.data[0];
  }

  public async getAllAppUsers(
    options: {
      first?: number;
      page?: number;
      whereCondition?: WhereCondition;
      orderByCondition?: OrderBy[];
      search?: string;
    } = {}
  ): Promise<AllAppUsersInterface> {
    const { first, page, whereCondition, orderByCondition, search } = options;

    const response = await this.client.query({
      query: GET_ALL_APP_USERS,
      variables: {
        first,
        page,
        whereCondition,
        orderByCondition,
        search
      },
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });
    return response.data;
  }

}


class Admin {
  constructor(protected client: ClientType) { }
  

  public async appCreateUser(data: AppCreateUserParams): Promise<CreatedAppCreateUser> {
    const response = await this.client.mutate({
      mutation: APP_CRTEATE_USER,
      variables: { data: data },
    });

    return response.data
  }


}

export class App {
  public users: Users;
  public admin: Admin;

  constructor(protected client: ClientType) {
    this.users = new Users(this.client);
    this.admin = new Admin(this.client);

  }
}
