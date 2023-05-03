export interface RoleInterface {
  id: number
  name: string;
  title: string;
}

export interface AssignRoleInterface {
  userId: number;
  role: string;
}