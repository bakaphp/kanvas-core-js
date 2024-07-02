import { UserInterface } from './index';
export interface MessagesInterface {
  id: string;
  parent_id?: string;
  parent_unique_id?: any;
  uuid: string;
  companies_id: string;
  message?: any;
  message_types_id: string;
  user: UserInterface;
  appModuleMessage: AppModuleMessage;
}

interface AppModuleMessage {
  entity_id: string;
  system_modules: string;
}

export interface MessageInputInterface {
  message_verb: string;
  message: any;
  system_modules_id?: string;
  entity_id?: string;
  parent_id?: string;
  distribution?: DistributionInputInterface;
}

export interface MessageUpdateInputInterface {
  message: string;
}

export interface DistributionInputInterface {
  distributionType: string;
  channels: Array<string>;
  followers: Array<string>;
}

export interface MessageWhereConditions {
  column?: string;
  operator?: string;
  value?: string;
  and?: [MessageWhereConditions];
  or?: [MessageWhereConditions];
}

export interface HasAppModuleMessageWhereConditions {
  column: string;
  operator: string;
  value: string;
}

export interface OrderByMessage {
  column: string;
  order: string;
}

export enum InteractionTypeInput {
  LIKE,
  SAVE,
  SHARE,
  REPORT,
}
