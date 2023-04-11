import type { AppUserInterface, AppUpdatePasswordInterface } from '../../types';
import { USER_UPDATE_PASSWORD_MUTATION } from '../../mutations';
import { APP_USERS_QUERY } from '../../queries';
import type { ClientType } from '../../index';

class Users {
  constructor(protected client: ClientType) {}

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
}

export class App {
  public users: Users;

  constructor(protected client: ClientType) {
    this.users = new Users(this.client);
  }
}
