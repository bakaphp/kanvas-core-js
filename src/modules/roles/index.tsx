import { ClientType } from '../../index';
import { BaseCrud } from "modules/base";
import { createRoleMutation, removeRoleMutation, updateRoleMutation, assignRoleMutation } from "mutations";
import { hasRoleQuery, roleQuery } from "queries";
import { AssignRoleInterface, RoleInterface } from "types";

type CreateRole = Omit<RoleInterface, 'id'>;
type DeleteRole = Omit<RoleInterface, 'title'>;
export class Roles extends BaseCrud<RoleInterface, CreateRole, DeleteRole> {
  constructor(protected client: ClientType) {
    super(client, {
      get: roleQuery,
      create: createRoleMutation,
      update: updateRoleMutation,
      remove: removeRoleMutation,
    })
  }

  async assignRole(data: AssignRoleInterface): Promise<boolean> {
    const response = await this.client.mutate<{ assignRoleToUser: boolean }>({
      mutation: assignRoleMutation,
      variables: { ...data },
    });

    return response.data!.assignRoleToUser;
  }

  async hasRole(data: AssignRoleInterface): Promise<boolean> {
    const response = await this.client.query<{ hasRole: boolean }>({
      query: hasRoleQuery,
      variables: { ...data },
    });

    return response.data.hasRole;
  }
}