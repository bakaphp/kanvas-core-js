import { ClientType } from '../../index';
import { REGISTER_MUTATTION, FORGOT_PASSWORD_MUTATION } from '../../mutations';
import { UserInterface, CreateUserParams, CreatedUser } from '../../types';

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
}