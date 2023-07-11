/* eslint-disable @typescript-eslint/no-explicit-any */
// import { File } from 'types/file.interface';
// import { Location } from 'types/location.interface';
// import { RoleInterface } from './role.interface';

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
  description: string;
  interest: string;
  karma: string;
  language: string;
  lastname: string;
  lastvisit: string;
  last_visit: string;
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
  // photo: File;
  // files: File[];
  locale: string;
  // roles: RoleInterface[];
  states: string;
  intro?: string;
  manager_id?: string;
  user_activation_key: string;
  user_activation_forgot: boolean | null;
  // social_links: SocialLinkInterface[];
}

export interface CreateUserParams {
  email: string;
  firstname: string;
  lastname: string;
  displayname: string;
  password: string;
  password_confirmation: string;
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
  branches: {
    id: string;
    name: string;
    companies_id: string;
    phone: string;
  }[];
  companies: {
    id: string;
    name: string;
  }[];
  roles: string[];
  abilities: string[];
}
