import {
  CHANGE_PASSWORD_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REFRESH_TOKEN_MUTATION,
  RESET_PASSWORD_MUTATION,
  SOCIAL_LOGIN_MUTATION,
} from "@/graphql/auth.mutation";

import {
  AuthChangePasswordResponse,
  AuthLoginResponse,
  AuthLogoutResponse,
  AuthRefreshTokenResponse,
  AuthResetPasswordResponse,
  AuthSocialLoginInput,
  AuthSocialLoginResponse,
} from "@/types/auth";

import { ApolloClient } from "@apollo/client";

class Auth {
  #apolloClient: ApolloClient;

  constructor(client: ApolloClient) {
    this.#apolloClient = client;
  }

  public async login(
    options: { email: string; password: string },
  ) {
    const response = await this.#apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: { data: options },
    });

    return response.data as AuthLoginResponse;
  }

  public async logout() {
    const response = await this.#apolloClient.mutate({
      mutation: LOGOUT_MUTATION,
    });

    return response.data as AuthLogoutResponse;
  }

  public async refreshToken(token: string) {
    const response = await this.#apolloClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        refresh_token: token,
      },
    });

    return response.data as AuthRefreshTokenResponse;
  }

  public async resetPassword(
    options: {
      hashKey: string;
      newPassword: string;
      verifyPassword: string;
    },
  ) {
    const data = {
      hash_key: options.hashKey,
      new_password: options.newPassword,
      verify_password: options.verifyPassword,
    };

    const response = await this.#apolloClient.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: {
        data,
      },
    });

    return response.data as AuthResetPasswordResponse;
  }

  public async changePassword(
    options: {
      currentPassword: string;
      newPassword: string;
      newPasswordConfirmation: string;
    },
  ) {
    const data = {
      new_password_confirmation: options.newPasswordConfirmation,
      current_password: options.currentPassword,
      new_password: options.newPassword,
    };

    const response = await this.#apolloClient.mutate({
      mutation: CHANGE_PASSWORD_MUTATION,
      variables: {
        ...data,
      },
    });

    return response.data as AuthChangePasswordResponse;
  }

  public async socialLogin(
    data: AuthSocialLoginInput,
  ) {
    const response = await this.#apolloClient.mutate({
      mutation: SOCIAL_LOGIN_MUTATION,
      variables: {
        data,
      },
    });

    return response.data as AuthSocialLoginResponse;
  }
}

export function createAuth(
  client: ApolloClient,
) {
  return new Auth(client);
}
