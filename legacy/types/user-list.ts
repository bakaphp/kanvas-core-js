import {
  AppUserInterface,
  CompanyInterface,
  MessagesInterface,
  UserInterface,
} from "__index";
export interface UserListInput {
  name: string;
  description: string;
  is_public: boolean;
  is_default: boolean;
}

export interface UserList {
  id: string;
  slug: string;
  name: string;
  description: string;
  is_public: boolean;
  is_default: boolean;
  user: UserInterface;
  apps: Array<AppUserInterface>;
  company: CompanyInterface;
  items: Array<MessagesInterface>;
}
