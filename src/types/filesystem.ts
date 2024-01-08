export interface UPLOAD_INTERFACE {
  id: string;
  uuid: string;
  name: string;
  url: string;
}

export interface FILESYSTEM_ATTACH_INPUT {
  filesystem_uuid: string;
  field_name: string;
  system_module_uuid: string;
  entity_id: string;
}

export interface FILESYSTEM {
  id: string;
  uuid: string;
  name: string;
  url: string;
  type: string;
  size: number;
  field_name: string;
}
export interface FilesystemInputUrl {
  url: string;
  name: string;
}
