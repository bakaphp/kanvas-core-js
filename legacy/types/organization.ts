import { CompanyInterface } from "./companies";
import { UserData } from "./users";

export interface InputOrganizationParams {
  id: number;
  input: OrganizationInput;
}

export interface OrganizationInput {
  name: string;
  address?: string;
}

export interface OrganizationInterface {
  id: number;
  uuid: string;
  company: CompanyInterface;
  user: UserData;
  name: string;
  address?: String;
}
