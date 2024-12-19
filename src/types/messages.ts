import { FilesystemInterface, UserInterface } from './index';
import { PaginatorInfo } from './paginator';
export interface MessagesInterface {
  id: string;
  parent_id?: string;
  parent_unique_id?: any;
  uuid: string;
  additional_field?: any;
  companies_id: string;
  message?: any;
  slug?: any;
  reactions_count: number;
  comment_count: number;
  total_liked: number;
  total_disliked: number;
  total_saved: number;
  total_shared: number;
  total_view: number;
  total_children: number;
  message_types_id: string;
  user: UserInterface;
  tags: string[];
  children: MessagesInterface[];
  [alias: string]: MessagesInterface[] | any; // Allow dynamic alias for children
  myInteraction: MyInteractionInterface;
  created_at: string;
  appModuleMessage: AppModuleMessage;
  files: {
    data: FilesystemInterface[];
  };
}

interface MyInteractionInterface {
  is_liked: boolean;
  is_disliked: boolean;
  is_saved: boolean;
  is_shared: boolean;
  is_reported: boolean;
}

export interface AllMessages {
  messages: {
    data: MessagesInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}
export interface AllForYouMessages {
  forYouMessages: {
    data: MessagesInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}
export interface AllLikedMessagesByUser {
  messagesLikedByUser: {
    data: MessagesInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}
export interface AllMessagesGroupByDate {
  messagesGroupByDate: {
    data: MessagesInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}

export interface MessageUploadFiles {
  attachFileToMessage: MessagesInterface;
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
  message_verb?: string;
  is_public?: number;
  is_deleted?: number;
}

export interface DistributionInputInterface {
  distributionType: string;
  channels: Array<string>;
  followers: Array<string>;
}

export interface MessageSearchSuggestionInterface {
  objectID: string;
  _highlightResult: {
    query: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
    };
  };
}

export interface MessageSearchSuggestions {
  messageSearchSuggestions: MessageSearchSuggestionInterface[];
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
