export interface CustomFieldParams {
  name: string,
  data: any,
  system_module_uuid: string,
  entity_id: string
}

export interface CreatedCustomField {
  setCustomField: boolean;
}

export interface FetchedCustomField {
  getCustomField: any;
}

export interface FetchedAllCustomFields {
  getAllCustomField: any;
}

export interface DeletedCustomField {
  deleteCustomField: boolean;
}


export interface CustomFieldInput {
  name: string;
  data: any;
}

export interface CustomFieldData {
  data: {
    name: string;
    value: any;
  }[]
}