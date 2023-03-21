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

export interface DeletedCustomField {
  deleteCustomField: boolean;
}