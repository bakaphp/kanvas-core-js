import { ClientType } from '../../index';
import { GET_ROLES } from '../../queries';
import {
  AssignRoleUser,
  CreatedRoles,
  OrderBy,
  RemoveRoleUser,
  RolesInterface,
  UserRoleParams,
  WhereCondition,
} from '../../types';
import { ASSIGN_ROLE_USER, CREATE_ROLE, REMOVE_ROLE_USER } from '../../mutations';

export class Roles {
  constructor(protected client: ClientType) {}

  public async getRoles(
    options: {
      where?: WhereCondition;
      orderBy?: OrderBy[];
      search?:string
    } = {}
  ): Promise<CreatedRoles> {
    const { where, orderBy,search } = options;

    const response = await this.client.query({
      query: GET_ROLES,
      variables: {
        where,
        orderBy,
        search
      },
      fetchPolicy: 'network-only',
      partialRefetch: true,
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


  public async createRole(params: UserRoleParams): Promise<RolesInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_ROLE,
      variables: { ...params },
    });
    return response.data.createRole;
  }
}
