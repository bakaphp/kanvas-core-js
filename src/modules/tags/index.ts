
import { ClientType, GET_TAGS } from '../../index';
import { WhereCondition } from '../../types';
import { CreatedTags } from 'types/tags';

export class Tags {
  constructor(protected client: ClientType) {}
  public async getTags(
    options: {

      where?: WhereCondition;
    } = {}
  ): Promise<CreatedTags> {
    const {  where } = options;

    const response = await this.client.query({
      query: GET_TAGS,
      variables: { where },

    });
    return response.data.tags;
  }

}