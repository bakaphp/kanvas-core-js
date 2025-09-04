import { PaginatorInfo } from "./paginator";

export enum RolesEnum {
  OWNER = "Owner",
  ADMIN = "Admin",
  USER = "Users",
  AGENT = "Agents",
  DEVELOPER = "Developer",
  MANAGER = "Managers",
}

export interface RolesInterface {
  id: string | number;
  name: string;
  title: string;
  scope: string;
  userCount: number;
  abilitiesCount: number;
  systemRole: boolean;
}

export interface CreatedRoles {
  roles: {
    data: RolesInterface[];
    paginatorInfo: PaginatorInfo;
  };
}

export interface AssignRoleUser {
  assignRoleToUser: boolean;
}

export interface RemoveRoleUser {
  removeRole: boolean;
}

export interface DeleteRole {
  deleteRole: boolean;
}

export interface UserRoleParams {
  userId: string | number;
  role: string | number;
}

export interface CreateRoleParams {
  name: string;
}

export interface UpdateRoleParams {
  id: string | number;
  name?: string;
  title?: string;
}
