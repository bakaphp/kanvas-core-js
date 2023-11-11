import {
  UserInterface,
  FilesystemInterface,
  FilesystemInputUrl,
  CompanyInterface,
} from 'index';

export interface CompanyBranchInput {
  name: string;
  companies_id: string;
  is_default: Boolean;
  website: string;
  address: string;
  zipcode: number;
  email: string;
  country_code: string;
  language: string;
  timezone: string;
  phone: string;
  files: Array<FilesystemInputUrl>;
}
export interface CompanyBranchInterface {
  id: string;
  uuid: string;
  company: CompanyInterface;
  companies_id: number;
  name: string;
  email: string;
  phone: string;
  photo: FilesystemInterface;
  zipcode: number;
  is_default: Boolean;
  created_at: string;
  updated_at: string;
}

export interface QueryBranchesWhereWhereConditions {
  column: string;
  operator: string;
  value: string;
  AND: Array<QueryBranchesWhereWhereConditions>;
  OR: Array<QueryBranchesWhereWhereConditions>;
}

export interface QueryBranchesOrderByOrderByClause {
  column: string;
  order: string;
}

export interface QueryCompanyBranchUsersWhereWhereConditions {
  column: string;
  operator: string;
  value: string;
  AND: Array<QueryCompanyBranchUsersWhereWhereConditions>;
  OR: Array<QueryCompanyBranchUsersWhereWhereConditions>;
}
