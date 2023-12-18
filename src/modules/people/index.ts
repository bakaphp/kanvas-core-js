import { ClientType } from '../../index';

import {
  PeopleInputInterface,
  PeopleInterface,
  WhereCondition,
  OrderBy,
} from '../../types';

import {
  CREATE_PEOPLE_MUTATION,
  UPDATE_PEOPLE_MUTATION,
  DELETE_PEOPLE_MUTATION,
  RESTORE_PEOPLE_MUTATION,
} from '../../mutations';

import { PEOPLE_QUERY } from '../../index';
export class People {
  constructor(protected client: ClientType) {}

  public async createPeople(
    input: PeopleInputInterface
  ): Promise<PeopleInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_PEOPLE_MUTATION,
      variables: { input: input },
    });
    return response.data.createPeople as PeopleInterface;
  }

  public async updatePeople(
    id: string,
    input: PeopleInputInterface
  ): Promise<PeopleInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_PEOPLE_MUTATION,
      variables: { id: id, input: input },
    });
    return response.data.updatePeople as PeopleInterface;
  }

  public async deletePeople(id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: DELETE_PEOPLE_MUTATION,
      variables: { id: id },
    });
    return response.data.deletePeople as Boolean;
  }

  public async restorePeople(id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: RESTORE_PEOPLE_MUTATION,
      variables: { id: id },
    });
    return response.data.restorePeople as Boolean;
  }

  public async getPeople(
    where?: WhereCondition,
    orderBy?: Array<OrderBy>,
    search?: string,
    first?: number,
    page?: number
  ): Promise<PeopleInterface[]> {
    const response = await this.client.query({
      query: PEOPLE_QUERY,
      variables: {
        where,
        orderBy,
        search,
        first,
        page,
      },
    });
    return response.data.peoples.data as PeopleInterface[];
  }
}
