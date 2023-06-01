export interface CreateCompanyInterface {
  name: string;
  website: string;
  address: string;
  zipcode: number;
  email: string;
  language: string;
}

export interface CompanyInterface extends CreateCompanyInterface {
  id: number;
  timezone: string;
  phone: string;
  country_code: string;
  created_at: string;
  updated_at: string;
}

