import { CustomFieldInput } from './custom-fields';
import { PaginatorInfo } from './paginator';

export interface AppUpdatePasswordInterface {
  appUserUpdatePassword: boolean;
}

export interface AppUserInterface {
  id: number;
  uuid: string;
  email: string;
  displayname: string;
  firstname: string;
  lastname: string;
  default_company: number;
  default_company_branch: number;
  sex: string;
  description: string | null;
  user_active: boolean;
  roles: string[];
  address: AddressInterface;
  contact: ContantInterface;
  is_active: boolean;
  companies: CompanyInterface[];
  branches: BranchInterface[];
  created_at: string;
  updated_at: string;
}

interface AddressInterface {
  address_1: string | null;
  address_2: string | null;
  zip_code: string | null;
  city: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    states_id: number;
    countries_id: number;
  } | null;
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  } | null;
  state: {
    id: number;
    code: string;
    name: string;
  } | null;
}

interface ContantInterface {
  phone_number: string | null;
  cell_phone_number: string | null;
}

interface CompanyInterface {
  id: number;
  uuid: string;
  name: string;
}

interface BranchInterface {
  id: number;
  name: string;
  companies_id: number;
}

interface FileUpload {
  id: number;
  name: string;
  url: string;
}

export interface MultiUpload {
  multiUpload: FileUpload[];
}

export interface AllAppUsersInterface {
  appUsers: {
    data: AppUserInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}

export interface AppCreateUserParams {
  email: string;
  firstname?: string;
  lastname?: string;
  displayname?: string;
  company_name?: string;
  phone_number?: string;
  cell_phone_number?: string;
  role_ids?:  (string | number)[];
  password?: string;
  custom_fields: CustomFieldInput[];
  create_company?: boolean
}

export interface CreatedAppCreateUser {
  appCreateUser: AppUserInterface;
}

export interface AppActivateUser {
  appActivateUser: boolean;
}

export interface AppDeactiveUser {
  appDeActiveUser: boolean;
}

export interface AppWithAccessResponse {
  apps: {
    data: {
      id: string;
      name: string;
      key: string;
      default_apps_plan_id: string;
      created_at: string;
    }[];
    paginatorInfo: PaginatorInfo;
  };
}

export interface CreateAppInput {
  name: string;
  url: string;
  description?: string;
  domain: string;
  is_actived: 1;
  ecosystem_auth: 0,
  payments_active: 0,
  is_public: 1
  domain_based: 0
}

export interface CreateAppResponse {
  createApp: {
    name: string;
    url: string;
    description?: string;
    domain: string;
    is_actived: boolean;
    ecosystem_auth: boolean;
    payments_active: boolean;
    is_public: boolean;
    domain_based: boolean;
  };
}
