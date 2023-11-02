import { ClientType } from '../../index';
import { GET_ROLES } from '../../queries';
import {
  AssignRoleUser,
  CreatedRoles,
  RemoveRoleUser,
  UserRoleParams,
} from '../../types';
import { ASSIGN_ROLE_USER, REMOVE_ROLE_USER } from '../../mutations';

export class Roles {
  constructor(protected client: ClientType) {}

  public async getRoles(): Promise<CreatedRoles> {
    const response = await this.client.query({
      query: GET_ROLES,
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
