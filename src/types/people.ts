
import {
  ContactInputInterface,
  AddressInputInterface,
  CompanyInterface,
  CustomFieldInput,
  ContactInterface,
  AddressInterface,
  CustomFieldData,
} from './index';
import { OrganizationInterface } from './organization';
import { PaginatorInfo } from './paginator';
import { CreatedTags, TagInput } from './tags';

export interface PeopleInputInterface {
  firstname: string;
  middlename?: string;
  lastname: string;
  facebook_contact_id?: string;
  twitter_contact_id?: string;
  linkedin_contact_id?: string;
  google_contact_id?: string;
  dob?: string;
  contacts?: [ContactInputInterface];
  address?: [AddressInputInterface];
  custom_fields?: [CustomFieldInput];
  tags?: [TagInput];
  created_at: string;
  updated_at?:string
}



export interface PeopleEmploymentHistory{
  id: string;
  organization:OrganizationInterface;
  people:PeopleInterface;
  position:string;
  income:number;
  start_date:string;
  end_date:string;
  status:string;
  income_type:string;

}
export interface PeopleInterface {
  id: string;
  uuid: string;
  name: string;
  firstname: string;
  lastname: string;
  company?: CompanyInterface;
  contacts: ContactInterface[];
  address?: AddressInterface[];
  custom_fields?: CustomFieldData[];
  tags?: CreatedTags;
  employment_history?:PeopleEmploymentHistory[];
}


export interface CreatedPeople {
  data: PeopleInterface[];
  paginatorInfo?: PaginatorInfo;
}

