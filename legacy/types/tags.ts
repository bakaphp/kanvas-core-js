import { PaginatorInfo } from "./paginator";
import { SystemModuleInterface } from "./system-module";
import { UserInterface } from "./users";

export interface TagInput {
  name: string;
  slug?: string;
  weight?: number;
}

export interface TagInterfce {
  id: string;
  user: UserInterface;
  name: string;
  slug?: string;
  weight?: number;
  created_at: string;
  updated_at: string;
  taggables: TagEntity[];
}

interface TagEntity {
  id: string;
  entity_id: string;
  tags_id: string;
  system_module_name: string;
  system_module: SystemModuleInterface;
  created_at: string;
  updated_at: string;
}

export interface AttachTagEntityInput {
  entity_id: string;
  tag_id: string;
  system_module_uuid: string;
}

export interface CreatedTags {
  data: TagInterfce[];
  paginatorInfo?: PaginatorInfo;
}
