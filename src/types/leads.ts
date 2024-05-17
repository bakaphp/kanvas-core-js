/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomFieldInput, CustomFieldData } from './custom-fields';
import { PaginatorInfo } from './paginator';
import {
  PeopleInterface,
  ChannelInterface,
  SystemModuleInterface,
} from './index';
// interface Contact {
//   value: string;
//   contacts_types_id?: number;
//   weight?: number;
//   type?: Type;
// }

// interface Address {
//   address: string;
//   city: string;
// }

// interface People {
//   id: string;
//   uuid: string;
//   name?: string;
//   firstname?: string;
//   lastname?: string;
//   contacts: Contact[];
//   address?: Address[];
//   custom_fields?: CustomFieldInput[];
// }

interface User {
  id: number;
  firstname: string;
  lastname: string;
  displayname?: string;
}

interface Status {
  id: number;
  name: string;
  is_default: boolean;
}
interface Company {
  id: number;
  name: string;
}
interface Organization {
  name: string;
}

interface Receiver {
  name: string;
  uuid: string;
}

interface LeadAttachment {
  name: string;
  url: string;
}
interface Type {
  name: string;
}
interface Source {
  name: string;
}
interface Pipeline {
  name: string;
}
interface Stage {
  name: string;
}
export interface CreateLeadParams {
  branch_id: number;
  title: string;
  pipeline_stage_id: number;
  people: PeopleInterface;
  organization: Organization;
  custom_fields: CustomFieldInput[];
}

export interface CreateLeadData {
  id: number;
  uuid: string;
  title: string;
  firstname: string;
  lastname: string;
  reason_lost: string | null;
  description: string | null;
  created_at: string;
  user?: User;
  owner?: User;
  company: Company;
  organization?: Organization;
  status: Status;
  custom_fields: CustomFieldData;
  receiver?: Receiver | null;
  type?: Type | null;
  source?: Source | null;
  stage?: Stage | null;
  pipeline?: Pipeline | null;
  people?: PeopleInterface;
  followers?: { data: Follower[] };
  branch?:{id:number, uuid:string}
  paginatorInfo?: PaginatorInfo;
  files?: { data: LeadAttachment[] };
  channels?: ChannelInterface[];
  systemModule: SystemModuleInterface;
}

export interface LeadInput {
  branch_id: number;
  title: string;
  people: PeopleInterface;
  organization: Organization;
  leads_owner_id: number;
  receiver_id: number;
  status_id: number;
  type_id: number;
  source_id: number;
  description: string;
  reason_lost: string;
  pipeline_stage_id: number;
  custom_fields: CustomFieldInput[];
  files?: LeadAttachment[];
}

export interface UpdateLeadInput {
  branch_id: number;
  title?: string;
  people_id: string;
  organization_id?: number;
  leads_owner_id?: number;
  receiver_id?: number;
  status_id?: number;
  type_id?: number;
  source_id?: number;
  description?: string;
  reason_lost?: string;
  pipeline_stage_id?: number;
  custom_fields?: CustomFieldInput[];
  files?: LeadAttachment[];
}
export interface WhereCondition {
  column: string;
  operator: string;
  value: number | string | Array<string | number>;
  and?: [WhereCondition];
  or?: [WhereCondition];
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

interface Follower {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface LeadsDashboardData {
  leadsDashboard: { data: LeadsAmounts[] };
}

export interface LeadsData {
  leads: { data: CreateLeadData[]; paginatorInfo?: PaginatorInfo };
}
