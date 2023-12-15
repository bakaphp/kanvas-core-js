import {
  ContactInputInterface,
  AddressInputInterface,
  CompanyInterface,
  UserInterface,
  CustomFieldInput,
  ContactInterface,
  AddressInterface,
} from './index';

export interface PeopleInputInterface {
  id?: string;
  firstname: string;
  middlename: string;
  lastname: string;
  facebook_contact_id: string;
  twitter_contact_id: string;
  linkedin_contact_id: string;
  google_contact_id: string;
  dob: string;
  contacts?: [ContactInputInterface];
  address?: [AddressInputInterface];
}
export interface PeopleInterface {
  id: string;
  uuid: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  company: CompanyInterface;
  user: UserInterface;
  contacts: ContactInterface[];
  address?: AddressInterface[];
  custom_fields?: CustomFieldInput[];
}
