import { ClientType } from '../../index';
import axios from 'axios';
import FormData from 'form-data';
import {
  MessageInputInterface,
  MessagesInterface,
  InteractionTypeInput,
  HasAppModuleMessageWhereConditions,
  OrderByMessage,
  WhereCondition,
  MessageUpdateInputInterface,
  AllMessages,
  AllMessagesGroupByDate,
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

interface Options {
  url: string;
  key: string;
  adminKey?: string;
  authAxiosMiddleware?: any;
}

import {
  GET_MESSAGES_BY_DISPLAYNAME_AND_SLUG,
  GET_MESSAGES_GROUP_BY_DATE_QUERY,
  GET_MESSAGES_QUERY,
} from '../../queries';

import { MessagesComments } from '../messages-comments';
export class Messages {
  public comments: MessagesComments;
  protected axiosClient: any;

  constructor(protected client: ClientType, protected options?: Options) {
    this.comments = new MessagesComments(client);
    if (this.options) {
      this.axiosClient = axios.create({
        baseURL: this.options.url,
        headers: {
          'X-Kanvas-App': this.options.key,
          ...(this.options.adminKey && {
            'X-Kanvas-Key': this.options.adminKey,
          }),
        },
      });

      this.axiosClient.interceptors.request.use(
        this.options.authAxiosMiddleware,
        function(error: any) {
          return Promise.reject(error);
        }
      );
    }
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

  public async getMessages(
    options: {
      where?: WhereCondition;
      hasAppModuleMessageWhere?: HasAppModuleMessageWhereConditions;
      orderBy?: Array<OrderByMessage>;
      search?: string;
      first?: number;
      page?: number;
      hasTags?: WhereCondition;
      hasType?: WhereCondition;
    } = {}
  ): Promise<AllMessages> {
    const {
      hasAppModuleMessageWhere,
      search,
      hasTags,
      hasType,
      where,
      orderBy,
      first,
      page,
    } = options;
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
    return response.data;
  }

  public async getMessagesGroupByDate(
    options: {
      where?: WhereCondition;
      hasAppModuleMessageWhere?: HasAppModuleMessageWhereConditions;
      orderBy?: Array<OrderByMessage>;
      search?: string;
      first?: number;
      page?: number;
    } = {}
  ): Promise<AllMessagesGroupByDate> {
    const {
      where,
      hasAppModuleMessageWhere,
      orderBy,
      search,
      first,
      page,
    } = options;
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
    return response.data;
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

  public async attachFileToMessage(id: string, file: File): Promise<String> {
    if (!this.options || !this.axiosClient)
      throw new Error('FileSystem module not initialized');

    const formData = new FormData();
    formData.append(
      'operations',
      JSON.stringify({
        query: `mutation ($file: Upload!) { attachFileToMessage(message_id: ${id},file: $file) {id, uuid, message } }`,
        variables: {
          file: null,
        },
      })
    );
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
    formData.append('0', JSON.stringify(file), file.name);

    let response = await this.axiosClient.post('', formData);

    return response.data;

    //  return response.data.messages as MessagesInterface;
  }
}
