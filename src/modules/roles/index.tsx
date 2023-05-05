import { Base, ComposableCrud } from '../base';
import { ClientType } from '../../index';
import { removeUserRolMutation, assignRoleMutation, createRoleMutation } from "../../mutations";
import { hasRoleQuery, roleQuery } from "../../queries";
import { RoleInterface, UserRoleInterface } from "../../types";

type CreateRole = Omit<RoleInterface, 'id'>;

export class Roles extends Base {
  private crud: ComposableCrud;
  
  constructor(protected client: ClientType) {
    super(client);
    this.crud = new ComposableCrud(client);
  }

  async all(): Promise<RoleInterface[]> {
    const response = await this.crud.all<RoleInterface>(roleQuery);
    return response;
  }

  async create(variables: CreateRole): Promise<RoleInterface> {
    const response = await this.crud.handle<RoleInterface, CreateRole>(
      variables, createRoleMutation,
    );
    return response;
  }

  async update(variables: RoleInterface): Promise<RoleInterface> {
    const response = await this.crud.update<RoleInterface>(
      variables, createRoleMutation,
    );
    return response;
  }
  
  async removeUserRole(variables: UserRoleInterface): Promise<boolean>{
    const response = await this.client.mutate<{ removeRole: boolean }>({
      variables,
      mutation: removeUserRolMutation,
    });

    return response.data!.removeRole;
  }

  async assignRole(variables: UserRoleInterface): Promise<boolean> {
    const response = await this.client.mutate<{ assignRoleToUser: boolean }>({
      variables,
      mutation: assignRoleMutation,
    });

    return response.data!.assignRoleToUser;
  }

  async hasRole(variables: UserRoleInterface): Promise<boolean> {
    const response = await this.client.query<{ hasRole: boolean }>({
      variables,
      query: hasRoleQuery,
    });

    return response.data.hasRole;
  }
}