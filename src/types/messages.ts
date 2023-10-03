import { UserInterface } from './index';
export interface MessagesInterface {
    id: string;
    parent_id: string;
    parent_unique_id: any;
    uuid: string;
    companies_id: string;
    message: any;
    message_types_id: string;
    user: UserInterface
}