import { ClientType } from '../../index';
import { GET_ROLES } from '../../queries';
import { AssignRoleToUser, CreatedRoles } from '../../types';
import { ASSIGN_ROLE_USER } from '../../mutations';

export class Roles {
  constructor(protected client: ClientType) {}

  public async getRoles(): Promise<CreatedRoles> {
    const response = await this.client.query({
      query: GET_ROLES,
    });
    return response.data;
  }

  public async assignRoleToUser(
    userId: string | number,
    role: string | number
  ): Promise<AssignRoleToUser> {
    const response = await this.client.mutate({
      mutation: ASSIGN_ROLE_USER,
      variables: {
        userId,
        role,
      },
    });
    return response.data;
  }
}
