import { CompanyInterface, MessagesInterface, UserInterface } from "./index";

export interface MessageCommentInputInterface {
  message_id: string;
  message: string;
  parent_id?: string;
}

export interface MessageCommentsInterface {
  id: string;
  user: UserInterface;
  company: CompanyInterface;
  parent?: MessageCommentsInterface;
  messages: MessagesInterface;
  message: string;
}
