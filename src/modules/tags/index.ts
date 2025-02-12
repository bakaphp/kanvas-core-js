import { ClientType } from '../../index';
import {
  ATTACH_TAG_TO_ENTITY,
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG,
} from '../../mutations';
import { GET_TAGS } from '../../queries';
import { OrderBy, WhereCondition } from '../../types';
import {
  AttachTagEntityInput,
  CreatedTags,
  TagInput,
  TagInterfce,
} from 'types/tags';

export class Tags {
  constructor(protected client: ClientType) { }
  public async getTags(
    options: {
      first?: number;
      page?: number;
      where?: WhereCondition;
      orderBy?: OrderBy[];
      search?: string;
    } = {}
  ): Promise<CreatedTags> {

    const { first, page, where, search, orderBy } = options;

    const response = await this.client.query({
      query: GET_TAGS,
      variables: { first, page, where, search, orderBy },
      fetchPolicy: 'no-cache',
    });
    return response.data.tags;
  }

  public async createTag(input: TagInput): Promise<TagInterfce> {
    const response = await this.client.mutate({
      mutation: CREATE_TAG,
      variables: { input: input },
    });
    return response.data.createTag;
  }

  public async updateTag(
    id: number | string,
    input: TagInput
  ): Promise<TagInterfce> {
    const response = await this.client.mutate({
      mutation: UPDATE_TAG,
      variables: { id: id, input: input },
    });
    return response.data.updateTag;
  }

  public async deleteTag(id: number | string): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: DELETE_TAG,
      variables: { id: id },
    });
    return response.data.deleteTag;
  }

  public async attachTagToEntity(
    input: AttachTagEntityInput
  ): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: ATTACH_TAG_TO_ENTITY,
      variables: { input: input },
    });
    return response.data;
  }
}
