
export interface ContactInterface {
  value: string;
  contacts_types_id?: number;
  weight?: number;
  type?: ContactTypeInterface;
}


export interface ContactTypeInterface {
  name: string;
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
