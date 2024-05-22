import { ClientType } from '../../index';
import {
  CHANGE_PASSWORD_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REFRESH_TOKEN_MUTATION,
  RESET_PASSWORD_MUTATION,
  SOCIAL_LOGIN_MUTATION,
} from '../../mutations';
import {
  AuthenticationInterface,
  ChangePasswordInterface,
  LogoutInterface,
  RefreshTokenInterface,
  ResetPasswordInterface,
  SocialLoginInputInterface,
} from '../../types';

export class Auth {
  constructor(protected client: ClientType) {}

  public async login(
    email: string,
    password: string
  ): Promise<AuthenticationInterface> {
    const data = { email, password };
    const response = await this.client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { data },
    });
    return response.data.login as AuthenticationInterface;
  }

  public async logout(): Promise<LogoutInterface> {
    const response = await this.client.mutate({
      mutation: LOGOUT_MUTATION,
    });
    return response.data as LogoutInterface;
  }

  public async refreshToken(token: string): Promise<RefreshTokenInterface> {
    const response = await this.client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        refresh_token: token,
      },
    });
    return response.data;
  }

  public async resetPassword(
    hash_key: string,
    new_password: string,
    verify_password: string
  ): Promise<ResetPasswordInterface> {
    const data = { hash_key, new_password, verify_password };

    const response = await this.client.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: {
        data,
      },
    });

    return response.data as ResetPasswordInterface;
  }

  public async changePassword(
    current_password: string,
    new_password: string,
    new_password_confirmation: string
  ): Promise<ChangePasswordInterface> {
    const data = {
      current_password,
      new_password,
      new_password_confirmation,
    };

    const response = await this.client.mutate({
      mutation: CHANGE_PASSWORD_MUTATION,
      variables: {
        ...data,
      },
    });

    return response.data as ChangePasswordInterface;
  }

  public async socialLogin(
    data: SocialLoginInputInterface
  ): Promise<AuthenticationInterface> {
    const response = await this.client.mutate({
      mutation: SOCIAL_LOGIN_MUTATION,
      variables: {
        data,
      },
    });
    return response.data;
  }
}
