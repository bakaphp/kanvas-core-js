export interface MessageTypeInterface {
  id: number;
  languages_id: number;
  apps_id: number;
  uuid: string;
  name: string;
  verb: string;
  description: string;
  templates_plura: string;
}

export interface CreateMessageTypeInputInterface {
  languages_id: number;
  name: string;
  verb: string;
  template: string;
  templates_plura: string;
}

export interface QueryMessageTypesWhereWhereConditions {
  column: string;
  operator: string;
  value: string;
}
