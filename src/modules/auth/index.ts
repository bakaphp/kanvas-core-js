import { ClientType } from '../../index';
import { LOGIN_MUTATION, LOGOUT_MUTATION } from '../../mutations';
import { AuthenticationInterface, LogoutInterface } from '../../types';

export class Auth {
  constructor(protected client: ClientType) {}

  public async login(email: string, password: string): Promise<AuthenticationInterface> {
    const data = { email, password };
    const response = await this.client.mutate({
      mutation: LOGIN_MUTATION, variables: { data }
    });
    return response.data.login as AuthenticationInterface;
  }

  public async logout(): Promise<LogoutInterface> {
    const response = await this.client.mutate({
      mutation: LOGOUT_MUTATION
    });
    return response.data as LogoutInterface;
  }
}