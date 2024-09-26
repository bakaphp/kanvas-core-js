import { Companies } from 'modules/companies';
import { UserData } from './users';
import { SystemModules } from 'modules/system-modules';
import { FILESYSTEM } from './filesystem';

export interface FILESYSTEM_MAPPER {
  id: string;
  users: UserData;
  company: Companies;
  name: string;
  file_header: any;
  mapping: any;
  configuration: any;
  system_module: SystemModules;
  created_at: string;
  updated_at: string;
}

export interface FILESYSTEM_MAPPER_INPUT {
  name: string;
  system_module_id: string;
  file_header: any;
  mapping: any;
  configuration: any;
}

export interface UpdateFilesystemMapperInput{
  mapper_id: string;
  name: string;
  file_header: any;
  mapping: any;
  configuration: any;
}

export interface FILESYSTEM_IMPORT_INPUT {
  regions_id: string;
  filesystem_mapper_id: string;
  filesystem_id: string;
}

export interface FILESYSTEM_IMPORT {
  id: string;
  filesystemMapper: FILESYSTEM_MAPPER;
  filesystem: FILESYSTEM;
  results: any;
}
