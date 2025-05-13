import { CompanyBranchInterface, UserInterface } from 'index';
import { PaginatorInfo } from './paginator';

export interface CompanyInterface {
  id: string;
  uuid: string;
  name: string;
  website?: string;
  address?: string;
  zipcode?: number;
  email?: string;
  language?: string;
  timezone?: string;
  phone?: string;
  user?: UserInterface;
  groups?: CompanyGroup[];
  is_active: boolean;
  total_users: number;
  country_code?: string;
  created_at?: string;
  updated_at?: string;
  branches: CompanyBranchInterface[];
  photo?: {
    url: string;
  };
  address_2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  countries: Countries;
  states: State;
  cities: City;
}

export interface CompanyGroup {
  id: string;
  uuid: string;
  name: string;
  app: any;
  stripe_id?: string;
  is_default: number;
  country_code?: string;
  created_at?: string;
  updated_at?: string;
}

export interface State {
  id: string;
  name: string;
  code: string;
}
export interface Countries {
  id: string;
  name: string;
  code: string;
  states: Array<State>;
}

export interface City {
  id: string;
  name: string;
  state_id: string;
}

export interface CompanyInput {
  name: string;
  website?: string;
  address?: string;
  zipcode?: number;
  email?: string;
  language?: string;
  timezone?: string;
  phone?: string;
  country_code?: string;
  files?: File[];
  is_active?: boolean;
  users_id: number;
  countries_id?: string;
  states_id?: string;
  cities_id?: string;
  address_2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
}

export interface QueryCompaniesWhereWhereConditions {
  column: string;
  operator: string;
  value: string;
  AND?: Array<QueryCompaniesWhereWhereConditions>;
  OR?: Array<QueryCompaniesWhereWhereConditions>;
}

export interface QueryCompaniesWhereWhereConditionsRelation {
  relation: string;
  operator: string;
  amount: number;
  condition: QueryCompaniesWhereWhereConditions;
}

export interface QueryCompanyUsersWhereWhereConditions {
  column: string;
  operator: string;
  value: string;
  AND?: Array<QueryCompanyUsersWhereWhereConditions>;
  OR?: Array<QueryCompanyUsersWhereWhereConditions>;
}

export interface CompanySettings {
  name: string;
  settings: any;
}

export interface InputCompanyParams {
  id: number;
  input: CompanyInput;
}

export interface CreatedCompanies {
  companies: {
    data: CompanyInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}

export interface CreatedCompanyUsers {
  companyUsers: {
    data: UserInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}
