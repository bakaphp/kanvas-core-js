import { ClientType } from '../../index';

import {
  CREATE_TOPIC_MUTATION,
  UPDATE_TOPIC_MUTATION,
  FOLLOW_TOPIC_MUTATION,
  UNFOLLOW_TOPIC_MUTATION,
} from '../../mutations/';
import { GET_TOPICS } from '../../queries/';
import {
  TopicInputInterface,
  TopicsInterface,
  QueryGetTopicsWhereInterface,
} from '../../types/';
export class Topics {
  constructor(protected client: ClientType) {}

  public async createTopic(
    input: TopicInputInterface
  ): Promise<TopicsInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_TOPIC_MUTATION,
      variables: { input: input },
    });

    return response.data.createTopic as TopicsInterface;
  }

  public async updateTopic(
    id: string,
    input: TopicInputInterface
  ): Promise<TopicsInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_TOPIC_MUTATION,
      variables: { id: id, input: input },
    });

    return response.data.updateTopic as TopicsInterface;
  }

  public async getTopics(
    where: QueryGetTopicsWhereInterface
  ): Promise<TopicsInterface[]> {
    const response = await this.client.query({
      query: GET_TOPICS,
      variables: { where: where },
    });
    return response.data.getTopics.data as TopicsInterface[];
  }

  public async followTopic(id: string): Promise<void> {
    await this.client.mutate({
      mutation: FOLLOW_TOPIC_MUTATION,
      variables: { id: id },
    });
  }

  public async unFollowTopic(id: string): Promise<void> {
    await this.client.mutate({
      mutation: UNFOLLOW_TOPIC_MUTATION,
      variables: { id: id },
    });
  }
}
