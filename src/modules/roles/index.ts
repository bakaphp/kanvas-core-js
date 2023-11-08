import { ClientType } from '../../index';
import { GET_ROLES } from '../../queries';
import {
  AssignRoleUser,
  CreatedRoles,
  OrderBy,
  RemoveRoleUser,
  UserRoleParams,
  WhereCondition,
} from '../../types';
import { ASSIGN_ROLE_USER, REMOVE_ROLE_USER } from '../../mutations';

export class Roles {
  constructor(protected client: ClientType) {}

  public async getRoles(
    options: {
      whereCondition?: WhereCondition;
      orderByCondition?: OrderBy[];
    } = {}
  ): Promise<CreatedRoles> {
    const { whereCondition, orderByCondition } = options;

    const response = await this.client.query({
      query: GET_ROLES,
      variables: {
        whereCondition,
        orderByCondition,
      },
    });
    return response.data;
  }

  public async assignRoleUser(params: UserRoleParams): Promise<AssignRoleUser> {
    const response = await this.client.mutate({
      mutation: ASSIGN_ROLE_USER,
      variables: { ...params },
    });
    return response.data;
  }

  public async removeRoleUser(params: UserRoleParams): Promise<RemoveRoleUser> {
    const response = await this.client.mutate({
      mutation: REMOVE_ROLE_USER,
      variables: { ...params },
    });
    return response.data;
  }
}
