/* eslint-disable @typescript-eslint/no-explicit-any */
// import { File } from 'types/file.interface';
// import { Location } from 'types/location.interface';
// import { RoleInterface } from './role.interface';

interface Contact {
  value: string;
  contacts_types_id: number;
  weight: number;
}

interface Address {
  address: string;
  city: string;
}

interface CustomFieldData {
  data: {
    name: string;
    value: any;
  }[]
}

interface CustomFieldInput {
  name: string;
  data: any;
}

interface People {
  firstname: string;
  lastname: string;
  contacts: Contact[];
  address: Address[];
  custom_fields: CustomFieldInput[]; 
}


interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface Status {
  id: number;
  name: string;
  is_default: string;
}
interface Company {
  id: number;
  name: string;
}
interface Organization {
  name: string;
}

export interface CreateLeadParams{
  branch_id: number;
  title: string;
  pipeline_stage_id: number;
  people: People;
  organization: Organization;
  custom_fields: CustomFieldInput[];
}


export interface CreateLeadData {
  id: number;
  uuid: string;
  title: string;
  firstname: string;
  lastname: string;
  reason_lost: string; 
  description: string;
  created_at: string;
  user: User;
  owner: User;
  company: Company;
  status: Status;
  custom_fields: CustomFieldData;
}


export interface LeadInput {
  branch_id: number;
  title: string;
  people: People;
  organization: Organization
  leads_owner_id: number;
  receiver_id: number;
  status_id: number;
  type_id: number;
  source_id: number;
  description: string;
  reason_lost: string;
  pipeline_stage_id: number;
  custom_fields: CustomFieldInput[];
}
