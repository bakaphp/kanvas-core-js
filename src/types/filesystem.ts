export interface FilesystemInterface {
  id: string;
  uuid: string;
  name: string;
  url: string;
  type: string;
  size: number;
  field_name: string;
  attributes?: any;
}

export interface FilesystemAttachInput {
  filesystem_uuid: string;
  field_name: string;
  system_module_uuid: string;
  entity_id: string;
}

export interface SystemModuleEntityInput {
  name: string;
  data: any;
  system_module_uuid: string;
  entity_id: string;
}

export interface FilesystemInputUrl {
  url: string;
  name: string;
}

export interface UploadFileResponse {
  id: string;
  uuid: string;
  name: string;
  url: string;
}

export interface UploadCsvResponse {
  uploadCsv: {
    filesystem_id: string;
    row: Record<string, string>;
    header: string[];
  };
}

export interface EntityFilesResponse {
  entityFiles: {
    data: FilesystemInterface[];
    paginatorInfo: {
      currentPage: number;
      lastPage: number;
      total: number;
    };
  };
}

// Filesystem Mapper Types
export interface FilesystemMapperInterface {
  id: string;
  name: string;
  file_header: any;
  mapping: any;
  configuration: any;
  system_module: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface FilesystemMapperInput {
  name: string;
  system_module_id: string;
  file_header: any;
  mapping: any;
  configuration: any;
}

export interface UpdateFilesystemMapperInput {
  mapper_id: string;
  name: string;
  file_header: any;
  mapping: any;
  configuration: any;
}

export interface FilesystemImportInput {
  regions_id: string;
  filesystem_mapper_id: string;
  filesystem_id: string;
  extra?: Record<string, any>;
}

export interface FilesystemImportInterface {
  id: string;
  filesystemMapper: FilesystemMapperInterface;
  filesystem: FilesystemInterface;
  results: any;
}

export interface FilesystemMapperResponse {
  filesystemMappers: {
    data: FilesystemMapperInterface[];
    paginatorInfo: {
      currentPage: number;
      lastPage: number;
      hasMorePages: boolean;
      total: number;
    };
  };
}

export interface WhereCondition {
  column: string;
  operator: string;
  value: any;
  AND?: WhereCondition[];
  OR?: WhereCondition[];
}

// Profile Update Responses
export interface UpdatePhotoProfileResponse {
  updatePhotoProfile: {
    id: string;
    uuid: string;
    firstname: string;
    lastname: string;
    displayname: string;
    photo: {
      url: string;
    };
    [key: string]: any;
  };
}

export interface UpdateCompanyPhotoProfileResponse {
  updateCompanyPhotoProfile: {
    id: string;
    uuid: string;
    name: string;
    photo: {
      url: string;
    };
    [key: string]: any;
  };
}

export interface UpdateBranchPhotoProfileResponse {
  updatePhotoProfileToCompanyBranch: {
    id: string;
    uuid: string;
    name: string;
    photo: {
      url: string;
    };
    [key: string]: any;
  };
}
