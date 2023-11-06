export enum RolesEnum {
  OWNER = 'Owner',
  ADMIN = 'Admin',
  USER = 'Users',
  AGENT = 'Agents',
  DEVELOPER = 'Developer',
  MANAGER = 'Managers',
}

export interface RolesInterface {
  id: string | number;
  name: string;
  title: string;
  scope: string;
}

export interface CreatedRoles {
  roles: {
    data: RolesInterface[];
  };
}

export interface AssignRoleUser {
  assignRoleToUser: boolean;
}

export interface RemoveRoleUser {
  removeRole: boolean;
}

export interface UserRoleParams {
  userId: string | number;
  role: string | number;
}
