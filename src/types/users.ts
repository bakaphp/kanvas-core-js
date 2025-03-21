/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomFieldData, CustomFieldInput } from './custom-fields';
import { PaginatorInfo } from './paginator';

export interface UserInterface {
  id: number;
  uuid: string;
  access_list: any[];
  active_subscription_id: number;
  card_brand: string;
  cell_phone_number: string;
  city_id: number;
  country_id: number;
  created_at: string;
  default_company: number;
  default_company_branch: number;
  displayname: string;
  dob: string;
  email: string;
  contact_email: string;
  firstname: string;
  description?: string;
  interest: string;
  karma: string;
  language: string;
  lastname: string;
  lastvisit: string;
  last_visit: string;
  mainRole: string;
  // location: Location;
  phone: string;
  phone_number: string;
  profile_header: string;
  profile_header_mobile: string;
  profile_image: string;
  profile_image_mobile: string;
  profile_image_thumb: string;
  profile_privacy: 0;
  profile_remote_image: string;
  registered: string;
  roles_id: 8;
  session_id: string;
  session_key: string;
  session_page: number;
  session_time: number;
  sex: string;
  state_id: number;
  status: number;
  stripe_id: string;
  system_modules_id: number;
  timezone: string;
  trial_ends_at: string;
  updated_at: string;
  user_active: number;
  user_last_login_try: number;
  user_level: number;
  user_login_tries: number;
  votes: number;
  votes_points: number;
  welcome: number;
  user_activation_email: string;
  photo?: {
    url: string;
  };
  // photo: File;
  // files: File[];
  locale: string;
  // roles: RoleInterface[];
  states: string;
  intro?: string;
  manager_id?: string;
  user_activation_key: string;
  user_activation_forgot: boolean | null;
  social: {
    total_message: number;
    total_followers: number;
    total_following: number;
    is_following: boolean;
    is_blocked: boolean;
  };
  // social_links: SocialLinkInterface[];
  custom_fields?: CustomFieldInput[];
}

export interface CreateUserParams {
  email: string;
  firstname: string;
  lastname: string;
  displayname?: string;
  password: string;
  password_confirmation: string;
  phone_number?: string;
  custom_fields?: CustomFieldInput[];
}

export interface CreatedUser {
  user: UserInterface;
}

export interface UserData {
  id: number;
  uuid: string;
  firstname: string;
  lastname: string;
  displayname: string;
  description?: string;
  default_company: number;
  default_company_branch: number;
  default_company_uuid: string;
  default_company_branch_uuid: string;
  email: string;
  mainRole: string;
  social: {
    total_message: number;
    total_followers: number;
    total_following: number;
    is_following: boolean;
    is_blocked: boolean;
  };
  branches: {
    id: string;
    name: string;
    phone: string;
  }[];
  companies: {
    id: string;
    name: string;
  }[];
  contact: {
    phone_number: string;
    cell_phone_number: string;
  };
  roles: string[];
  is_active: boolean;
  abilities: string[];
  custom_fields: CustomFieldData;
  photo?: {
    url: string;
  };
}

export interface UpdateUserParams {
  firstname: string;
  lastname: string;
  displayname?: string;
  phone_number: string;
  cell_phone_number: string;
  welcome?: boolean;
  role_ids?: (string | number)[];
  custom_fields?: CustomFieldInput[];
}

export interface DeleteInviteData {
  deleteInvite: boolean;
}

export interface BasicInvite {
  email?: string;
  firstname: string;
  lastname: string;
  invite_hash: string;
}

export interface InviteUserParams extends BasicInvite {
  role_id?: number;
  custom_fields?: CustomFieldInput[];
}

export interface InviteData {
  id: number;
  email: string;
  firstname?: string;
  lastname?: string;
  invite_hash: string;
  role_id?: number;
}

export interface InviteParams {
  email: string;
  companies_branches_id?: number;
  description?: String;
  email_template?: String;
  firstname: string;
  lastname: string;
  custom_fields?: CustomFieldInput[];
  role_id?: number;
}

export interface InviteProcessParams {
  invite_hash: string;
  firstname: string;
  lastname: string;
  password: string;
  phone_number?: string;
}

export interface InviteProcessData {
  id: number;
  token: string;
  refresh_token: string;
  token_expires: string;
  refresh_token_expires: string;
  time: string;
  timezone: string;
}

export interface RoleData {
  roles: { data: { id: number }[] };
}

export interface SocialLoginParams {
  token: string;
  provider: string;
}

export interface SocialLoginData extends InviteProcessData { }

export interface AllBlockedUsersInterface {
  blockedUsers: {
    data: UserInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}

export enum SourceSite {
  AndroidApp = "androidapp",
  IOSApp = "iosapp",
}

export interface DeviceParams {
  device_id: string;
  source_site: SourceSite; // Use the enum here
  source_username?: string;
}