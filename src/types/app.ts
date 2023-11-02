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
  sex: string;
  description: string | null;
  user_active: boolean;
  address: AddressInterface;
  contact: ContantInterface;
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
  };
}
