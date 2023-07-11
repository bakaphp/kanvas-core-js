import { ClientType, GET_USER_DATA_QUERY } from '../../index';
import { REGISTER_MUTATTION, FORGOT_PASSWORD_MUTATION } from '../../mutations';
import {
  UserInterface,
  CreateUserParams,
  CreatedUser,
  UserData,
} from '../../types';

export class Users {
  constructor(protected client: ClientType) {}

  public async register(userData: UserInterface | CreateUserParams): Promise<CreatedUser> {
    const response = await this.client.mutate({
      mutation: REGISTER_MUTATTION, variables: { data: userData }
    });
    return response.data as CreatedUser;
  }

  public async forgotPassword(email: string): Promise<void> {
    await this.client.mutate({
      mutation: FORGOT_PASSWORD_MUTATION, variables: { data: { email } }
    });
  }

  public async getUserData(): Promise<UserData> {
    const response = await this.client.query({
      query: GET_USER_DATA_QUERY,
    });

    return response.data.me;
  }
}
