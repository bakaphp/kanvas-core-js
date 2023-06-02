import { BaseInterface } from "./base";

export interface CreateCompanyInterface {
  name: string;
  website: string;
  address: string;
  zipcode: number;
  email: string;
  language: string;
}

export interface CompanyInterface extends CreateCompanyInterface, BaseInterface {
  timezone: string;
  phone: string;
  country_code: string;
}

export interface CompanyBranchInterface extends BaseInterface {
  name: string;
  companies_id: number;
  email: string;
  phone: string;
  is_default: boolean;
  zipcode: string;
}