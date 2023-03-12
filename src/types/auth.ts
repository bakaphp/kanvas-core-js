export interface AuthenticationInterface {
  id: number;
  token: string;
  refresh_token: string;
  token_expires: string;
  refresh_token_expires: string;
  time: string;
  timezone: string;
}

export interface LogoutInterface {
  logout: boolean;
}