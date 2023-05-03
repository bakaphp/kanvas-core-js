import { ClientType } from '../../index';
import { BaseCrud } from "modules/base";
import { createRoleMutation, removeRoleMutation, updateRoleMutation } from "mutations";
import { roleQuery } from "queries";
import { RoleInterface } from "types";

export class Roles extends BaseCrud<RoleInterface, Omit<RoleInterface, 'id'>, Omit<RoleInterface, 'title'>> {
  constructor(protected client: ClientType) {
    super(client, {
      get: roleQuery,
      create: createRoleMutation,
      update: updateRoleMutation,
      remove: removeRoleMutation,
    })
  }
}