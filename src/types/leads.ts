/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomFieldInput, CustomFieldData } from "./custom-fields";

interface Contact {
  value: string;
  contacts_types_id: number;
  weight: number;
}

interface Address {
  address: string;
  city: string;
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


export interface WhereCondition {
  column: string;
  operator: string;
  value: number | string;
}

export interface LeadsDashboardInput {
  first: number;
  where: WhereCondition;
}

interface LeadsAmounts {
  total_active_leads: number;
  total_closed_leads: number;
  total_agents: number;
}

export interface LeadsDashboardData {
  leadsDashboard: { data: LeadsAmounts[] }
}