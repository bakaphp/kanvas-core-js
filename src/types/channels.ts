import { MessagesInterface } from './messages';
import { UserInterface } from './users';
import { SystemModuleInterface } from './systemModule';

export interface ChannelInterface {
  id: string;
  name: string;
  slug: string;
  description: string;
  entity_namespace: string;
  entity_id: string;
  last_message_id: string;
  messages: Array<MessagesInterface>;
  users: Array<UserInterface>;
  systemModule: SystemModuleInterface;
}

export interface ChannelInputInterface {
  name: string;
  slug: string;
  description: string;
  entity_namespace_uuid: string;
  entity_id: string;
}
