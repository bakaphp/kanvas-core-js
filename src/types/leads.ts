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

interface People {
  firstname: string;
  lastname: string;
  contacts: Contact[];
  address: Address[];
  custom_fields: {
    data: {
      name: string;
      value: any;
    }[];
  }; 
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
  custom_fields: {
    data: {
      name: string;
      value: any;
    }[];
  };
}


export interface CreateLeadData {
  id: number;
  uuid: string;
  title: string;
  custom_fields: {
    data: {
      name: string;
      value: any;
    }[];
  };
  
}