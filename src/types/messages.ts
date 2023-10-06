import { UserInterface } from './index';
export interface MessagesInterface {
    id: string;
    parent_id: string;
    parent_unique_id: any;
    uuid: string;
    companies_id: string;
    message: any;
    message_types_id: string;
    user: UserInterface,
    appModuleMessage: AppModuleMessage
}

interface AppModuleMessage {
    entity_id: string;
    system_modules: string;
}

export interface MessageInput {
    message_types_id: string;
    message: any;
    system_modules_id: string;
    entity_id: string;
    parent_id: string;
}