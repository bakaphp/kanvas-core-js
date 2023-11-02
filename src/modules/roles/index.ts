import { ClientType } from '../../index';
import { GET_ROLES } from '../../queries';
import { CreatedRoles } from '../../types';

export class Roles {
  constructor(protected client: ClientType) {}

  public async getRoles(): Promise<CreatedRoles> {
    const response = await this.client.query({
      query: GET_ROLES,
    });
    return response.data;
  }
}
