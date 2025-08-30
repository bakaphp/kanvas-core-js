import { PaginatorInfo } from "./paginator";
import { CompanyInterface } from "./companies";
import { UserInterface } from "./users";

export interface ContactInterface {
  value: string;
  contacts_types_id?: number;
  weight?: number;
  type?: ContactTypeInterface;
}

export interface ContactTypeInterface {
  id: string;
  name: string;
  company: CompanyInterface;
  user: UserInterface;
}

export interface ContactInputInterface {
  value: string;
  contacts_types_id?: number;
  weight?: number;
}

export interface AddressInputInterface {
  address: string;
  address_2?: string;
  city?: string;
  city_id?: string;
  state?: string;
  state_id?: string;
  zip?: string;
  country?: string;
  country_id?: string;
  is_default?: boolean;
}

export interface CreatedContactTypes {
  data: ContactTypeInterface[];
  paginatorInfo?: PaginatorInfo;
}
