import { HandlePermissionInterface } from "../../types";
import { canQuery } from "../../queries";
import { Base } from "../base";
import { assignToUserMutation, removePermissionMutation } from "../../mutations";

export class Permisions extends Base {
  /**
   * check wheter the user can or cannot access by a given permission
   * @param variables properties needed for the query
   * @returns if the user has or not the permissions as boolean
   */
  async can(variables: HandlePermissionInterface): Promise<boolean> {
    const response = await this.client.query<{ can: boolean }>({
      query: canQuery,
      variables
    });
    
    return response.data.can;
  }

  /**
   * Assigns a permission to a user
   * @param variables properties needed for the mutation
   * @returns returns if the permission was assign or not
   */
  async assign(variables: HandlePermissionInterface): Promise<boolean> {
    const response = await this.client.mutate<{ givePermissionToUser: boolean }>({
      mutation: assignToUserMutation,
      variables
    });

    return response.data!.givePermissionToUser;
  }

  /**
   * Remove a permission from auser
   * @param variables properties needed for the mutation
   * @returns returns if the permission was remove or not
   */
  async remove(variables: HandlePermissionInterface): Promise<boolean> {
    const response = await this.client.mutate<{ removePermissionToUser: boolean }>({
      mutation: removePermissionMutation,
      variables
    });

    return response.data!.removePermissionToUser;
  }
}