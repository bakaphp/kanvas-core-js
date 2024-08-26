import { ClientType } from '../../index';

import { GET_CONTACT_TYPES } from '../../queries';
import { CreatedContactTypes, OrderBy, WhereCondition } from '../../types';

export class Contact {
  constructor(protected client: ClientType) {}
  public async getTags(
    options: {
      first?: number;
      page?: number;
      where?: WhereCondition;
      orderBy?: OrderBy[];
    } = {}
  ): Promise<CreatedContactTypes> {
    const { first, page, where, orderBy } = options;

    const response = await this.client.query({
      query: GET_CONTACT_TYPES,
      variables: { first, page, where, orderBy },
    });
    return response.data.contactType;
  }
}
