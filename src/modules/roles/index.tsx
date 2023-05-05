import { Base, ComposableCrud } from '../base';
import { ClientType } from '../../index';
import { removeUserRolMutation, assignRoleMutation, createRoleMutation } from "../../mutations";
import { hasRoleQuery, roleQuery } from "../../queries";
import { RoleInterface, UserRoleInterface } from "../../types";

export type CreateRole = Omit<RoleInterface, 'id'>;

export class Roles extends Base {
  private crud: ComposableCrud;
  
  constructor(protected client: ClientType) {
    super(client);
    this.crud = new ComposableCrud(client);
  }

  /**
   * Method that allow to retrieve a list of roles
   * @returns list of roles
   */
  async all(): Promise<RoleInterface[]> {
    const response = await this.crud.all<RoleInterface>(roleQuery);
    return response;
  }

  /**
   * Allow creationg of roles
   * @param variables properties needed to create a Role 
   * @returns created role
   */
  async create(variables: CreateRole): Promise<RoleInterface> {
    const response = await this.crud.handle<RoleInterface, CreateRole>(
      variables, createRoleMutation,
    );
    return response;
  }

  /**
   * Allow updating any given roles
   * @param variables properties needed to update a Role by given params 
   * @returns updated role
   */
  async update(variables: RoleInterface): Promise<RoleInterface> {
    const response = await this.crud.update<RoleInterface>(
      variables, createRoleMutation,
    );
    return response;
  }
  
  /**
   * Removes a given role to a user
   * @param variables use given userId and role name to remove the role from user
   * @returns boolean
   */
  async removeUserRole(variables: UserRoleInterface): Promise<boolean>{
    const response = await this.client.mutate<{ removeRole: boolean }>({
      variables,
      mutation: removeUserRolMutation,
    });

    return response.data!.removeRole;
  }

   /**
   * Assign a given role to a user
   * @param variables use given userId and role name to assign the role from user
   * @returns boolean
   */
  async assignRole(variables: UserRoleInterface): Promise<boolean> {
    const response = await this.client.mutate<{ assignRoleToUser: boolean }>({
      variables,
      mutation: assignRoleMutation,
    });

    return response.data!.assignRoleToUser;
  }

  /**
   * Determines if the user has a role
   * @param variables use given userId and role name to assign the role from user
   * @returns boolean
   */
  async hasRole(variables: UserRoleInterface): Promise<boolean> {
    const response = await this.client.query<{ hasRole: boolean }>({
      variables,
      query: hasRoleQuery,
    });

    return response.data.hasRole;
  }
}