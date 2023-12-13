import { ClientType } from '../../index';

import {
  MessageInputInterface,
  MessagesInterface,
  InteractionTypeInput,
  HasAppModuleMessageWhereConditions,
  OrderByMessage,
  WhereCondition
} from '../../types';
import {
  CREATE_MESSAGE_MUTATION,
  INTERACTION_MESSAGE_MUTATION,
  ATTACH_TOPIC_TO_MESSAGE_MUTATION,
  DETACH_TOPIC_TO_MESSAGE_MUTATION,
} from '../../mutations';

import { GET_MESSAGES_QUERY } from '../../queries';

export class Messages {
  constructor(protected client: ClientType) {}

  public async createMessage(
    input: MessageInputInterface
  ): Promise<MessagesInterface> {
    const response = this.client.mutate({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: { input: input },
    });
    return (await response).data.createMessage as MessagesInterface;
  }

  public async interactionMessage(
    id: string,
    type: InteractionTypeInput
  ): Promise<MessagesInterface> {
    const response = this.client.mutate({
      mutation: INTERACTION_MESSAGE_MUTATION,
      variables: { id: id, type: type },
    });
    return (await response).data.interactionMessage as MessagesInterface;
  }

  public async getMessages(
    where: WhereCondition,
    hasAppModuleMessageWhere: HasAppModuleMessageWhereConditions,
    orderBy: Array<OrderByMessage>,
    search: string,
    first: number,
    page: number
  ): Promise<MessagesInterface[]> {
    const response = await this.client.query({
      query: GET_MESSAGES_QUERY,
      variables: {
        where,
        hasAppModuleMessageWhere,
        orderBy,
        search,
        first,
        page,
      },
    });
    return response.data.getMessages as MessagesInterface[];
  }

  public async attachTopicToMessage(
    messageId: string,
    topicId: string
  ): Promise<void> {
    await this.client.mutate({
      mutation: ATTACH_TOPIC_TO_MESSAGE_MUTATION,
      variables: { message_id: messageId, topic_id: topicId },
    });
  }

  public async detachTopicToMessage(
    messageId: string,
    topicId: string
  ): Promise<void> {
    await this.client.mutate({
      mutation: DETACH_TOPIC_TO_MESSAGE_MUTATION,
      variables: { message_id: messageId, topic_id: topicId },
    });
  }
}
