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
    data: RolesInterface;
  };
}

export interface AssignRoleToUser {
  assignRoleToUser: boolean;
}
