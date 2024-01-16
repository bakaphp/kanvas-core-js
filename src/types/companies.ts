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
  is_active?:boolean
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

export interface CreatedCompanies {
  companies: {
    data: CompanyInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}
