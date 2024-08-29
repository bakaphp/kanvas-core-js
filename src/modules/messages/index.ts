import { ClientType } from '../../index';

import {
  MessageInputInterface,
  MessagesInterface,
  InteractionTypeInput,
  HasAppModuleMessageWhereConditions,
  OrderByMessage,
  WhereCondition,
  MessageUpdateInputInterface
} from '../../types';
import {
  CREATE_MESSAGE_MUTATION,
  INTERACTION_MESSAGE_MUTATION,
  ATTACH_TOPIC_TO_MESSAGE_MUTATION,
  DETACH_TOPIC_TO_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  DELETE_MESSAGE_MUTATION,
  DELETE_MULTIPLE_MESSAGE_MUTATION,
  DELETE_ALL_MESSAGE_MUTATION,
  LIKE_MESSAGE_MUTATION,
  SHARE_MESSAGE_MUTATION,
  VIEW_MESSAGE_MUTATION,
  DISLIKE_MESSAGE_MUTATION,
} from '../../mutations';

import { GET_MESSAGES_BY_DISPLAYNAME_AND_SLUG, GET_MESSAGES_GROUP_BY_DATE_QUERY, GET_MESSAGES_QUERY } from '../../queries';
import { MessagesComments } from '../messages-comments';
export class Messages {
  public comments: MessagesComments;

  constructor(protected client: ClientType) {
    this.comments = new MessagesComments(client);
  }

  public async createMessage(
    input: MessageInputInterface
  ): Promise<MessagesInterface> {
    const response = this.client.mutate({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: { input: input },
    });
    return (await response).data.createMessage as MessagesInterface;
  }

  public async updateMessage(
    id: string,
    input: MessageUpdateInputInterface
  ): Promise<MessagesInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_MESSAGE_MUTATION,
      variables: { input: input, id: id },
    });
    return response.data.updateMessage as MessagesInterface;
  }

  public async deleteMessage(id: string): Promise<Boolean> {
    await this.client.mutate({
      mutation: DELETE_MESSAGE_MUTATION,
      variables: { id: id },
    });
    return true;
  }

  public async deleteMultipleMessage(ids: [string]): Promise<Boolean> {
    await this.client.mutate({
      mutation: DELETE_MULTIPLE_MESSAGE_MUTATION,
      variables: { ids: ids },
    });
    return true;
  }

  public async deleteAllMessages(): Promise<Boolean> {
    await this.client.mutate({
      mutation: DELETE_ALL_MESSAGE_MUTATION,
      variables: {},
    });
    return true;
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
    page: number,
    hasTags?: WhereCondition,
    hasType?: WhereCondition
  ): Promise<MessagesInterface[]> {
    const response = await this.client.query({
      query: GET_MESSAGES_QUERY,
      variables: {
        where,
        hasAppModuleMessageWhere,
        hasTags,
        hasType,
        orderBy,
        search,
        first,
        page,
      },
      fetchPolicy: 'no-cache',
    });
    return response.data.messages as MessagesInterface[];
  }

  public async searchMessages(
    search: string
  ): Promise<MessagesInterface[]> {
    const response = await this.client.query({
      query: GET_MESSAGES_QUERY,
      variables: {
        search
      },
      fetchPolicy: 'no-cache',
    });
    return response.data.messages as MessagesInterface[];
  }

  public async getMessagesGroupByDate(
    where: WhereCondition,
    hasAppModuleMessageWhere: HasAppModuleMessageWhereConditions,
    orderBy: Array<OrderByMessage>,
    search: string,
    first: number,
    page: number
  ): Promise<MessagesInterface[]> {
    const response = await this.client.query({
      query: GET_MESSAGES_GROUP_BY_DATE_QUERY,
      variables: {
        where,
        hasAppModuleMessageWhere,
        orderBy,
        search,
        first,
        page,
      },
      fetchPolicy: 'no-cache',
    });
    return response.data.messagesGroupByDate as MessagesInterface[];
  }

  public async getMessageByDisplaynameAndSlug(
    displayname: string,
    slug: string
  ): Promise<MessagesInterface> {
    const response = await this.client.query({
      query: GET_MESSAGES_BY_DISPLAYNAME_AND_SLUG,
      variables: { displayname: displayname, slug: slug },
    });
    return response.data.messages as MessagesInterface;
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

  public async likeMessage(id: string): Promise<Boolean> {
    await this.client.mutate({
      mutation: LIKE_MESSAGE_MUTATION,
      variables: { id: id },
    });
    return true;
  }

  public async disLikeMessage(id: string): Promise<Boolean> {
    await this.client.mutate({
      mutation: DISLIKE_MESSAGE_MUTATION,
      variables: { id: id },
    });
    return true;
  }

  public async viewMessage(id: string): Promise<Boolean> {
    await this.client.mutate({
      mutation: VIEW_MESSAGE_MUTATION,
      variables: { id: id },
    });
    return true;
  }

  public async shareMessage(id: string): Promise<string> {
    const response = await this.client.mutate({
      mutation: SHARE_MESSAGE_MUTATION,
      variables: { id: id },
    });

    return response.data.shareMessage;
  }
}
