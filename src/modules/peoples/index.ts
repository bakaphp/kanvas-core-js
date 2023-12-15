import { ClientType } from '../../index';

import {
  PeopleInputInterface,
  PeopleInterface,
  WhereCondition,
} from '../../types';

import {
  CREATE_PEOPLE_MUTATION,
  UPDATE_PEOPLE_MUTATION,
} from '../../mutations';

export class Peoples {
  constructor(protected client: ClientType) {}

  public async createPeople(
    input: PeopleInputInterface
  ): Promise<PeopleInterface> {
    const response = this.client.mutate({
      mutation: CREATE_PEOPLE_MUTATION,
      variables: { input: input },
    });
    return (await response).data.createPeople as PeopleInterface;
  }

  public async updatePeople(
    id: string,
    input: PeopleInputInterface
  ): Promise<PeopleInterface> {
    const response = this.client.mutate({
      mutation: UPDATE_PEOPLE_MUTATION,
      variables: { id: id, input: input },
    });
    return (await response).data.updatePeople as PeopleInterface;
  }
}
