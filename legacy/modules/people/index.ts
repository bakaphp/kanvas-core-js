import { ClientType } from '../../__index';

import {
  PeopleInputInterface,
  PeopleInterface,
  WhereCondition,
  OrderBy,
  CreatedPeople,
} from '../../types';

import {
  CREATE_PEOPLE_MUTATION,
  UPDATE_PEOPLE_MUTATION,
  DELETE_PEOPLE_MUTATION,
  RESTORE_PEOPLE_MUTATION,
} from '../../mutations';

import {
  PEOPLE_COUNT,
  PEOPLE_COUNT_BY_TAG,
  PEOPLE_QUERY,
} from './../../queries/';
export class People {
  constructor(protected client: ClientType) {}

  public async createPeople(
    input: PeopleInputInterface
  ): Promise<PeopleInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_PEOPLE_MUTATION,
      variables: { input },
    });
    return response.data.createPeople as PeopleInterface;
  }

  public async updatePeople(
    id: string,
    input: PeopleInputInterface
  ): Promise<PeopleInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_PEOPLE_MUTATION,
      variables: { id, input },
    });
    return response.data.updatePeople as PeopleInterface;
  }

  public async deletePeople(id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: DELETE_PEOPLE_MUTATION,
      variables: { id },
    });
    return response.data.deletePeople as Boolean;
  }

  public async restorePeople(id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: RESTORE_PEOPLE_MUTATION,
      variables: { id },
    });
    return response.data.restorePeople as Boolean;
  }

  public async getPeople(
    options: {
      where?: WhereCondition;
      orderBy?: Array<OrderBy>;
      search?: string;
      first?: number;
      page?: number;
      hasEmails?: WhereCondition;
      hasPhones?: WhereCondition;
      hasTags?: WhereCondition;
      hasCustomFields?: WhereCondition;
    } = {}
  ): Promise<CreatedPeople> {
    const {
      first,
      page,
      where,
      orderBy,
      search,
      hasEmails,
      hasPhones,
      hasTags,
      hasCustomFields,
    } = options;

    const response = await this.client.query({
      query: PEOPLE_QUERY,
      variables: {
        where,
        orderBy,
        search,
        first,
        page,
        hasEmails,
        hasPhones,
        hasTags,
        hasCustomFields,
      },
      fetchPolicy: 'no-cache',
      partialRefetch: true,
    });
    return response.data.peoples;
  }

  public async getPeopleCount(): Promise<number> {
    const response = await this.client.query({
      query: PEOPLE_COUNT,
      fetchPolicy: 'no-cache',
      partialRefetch: true,
    });
    return response.data.peopleCount;
  }

  public async getPeopleCountByTag(tag: string): Promise<number> {
    const response = await this.client.query({
      query: PEOPLE_COUNT_BY_TAG,
      variables: { tag },
      fetchPolicy: 'no-cache',
      partialRefetch: true,
    });
    return response.data.peopleCountByTag;
  }
}
