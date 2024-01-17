import { UserInterface } from './users';
import { CompanyInterface } from './companies';
import { SystemModuleInterface } from './system-module';

export interface NotificationInterface {
  id: string;
  users: UserInterface;
  fromUsers: UserInterface;
  companies: CompanyInterface;
  systemModule: SystemModuleInterface;
  types: NotificationTypeInterface;
  entity_id: string;
  entity?: any;
  content?: string;
  read: number;
  content_group?: string;
  created_at: string;
  updated_at?: string;
}

export interface NotificationTypeInterface {
  id: string;
  systemModule: SystemModuleInterface;
  parent?: NotificationTypeInterface;
  channel: NotificationChannelInterface;
  name: string;
  key: string;
  verb?: string;
  event?: string;
  description?: string;
  template?: string;
  weight: number;
  is_published: number;
  created_at: string;
  updated_at?: string;
}

export interface NotificationChannelInterface {
  id: string;
  name: string;
  slug: string;
}

export interface NotificationEntityFilterInputInterface {
  nested_key: string;
  value: string;
}

export interface NotificationTypeFilterInputInterface {
  verb: string;
  event: string;
}

export interface NotificationMessageResponseInterface {
  sent: boolean;
  message: string;
}
