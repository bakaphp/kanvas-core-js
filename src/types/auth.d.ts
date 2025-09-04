export interface AuthLoginResponse {
  token: string;
  refresh_token: string;
  token_expires: string;
  refresh_token_expires: string;
}

export interface AuthLogoutResponse {
  logout: boolean;
}

export interface AuthRefreshTokenResponse {
  token: string;
}

export interface AuthResetPasswordResponse {
  resetPassword: boolean;
}

export interface AuthChangePasswordResponse {
  changePassword: boolean;
}

export interface AuthSocialLoginInput {
  token: string;
  provider: string;
}

export interface AuthSocialLoginResponse {
  token: string;
  refresh_token: string;
  token_expires: string;
  refresh_token_expires: string;
}
