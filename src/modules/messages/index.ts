import { ClientType, Options } from '../../index';
import axios from 'axios';
import FormData from 'form-data';

import {
  MessageInputInterface,
  MessagesInterface,
  HasAppModuleMessageWhereConditions,
  OrderByMessage,
  WhereCondition,
  MessageUpdateInputInterface,
  AllMessages,
  AllMessagesGroupByDate,
  MessageUploadFiles,
  MessageSearchSuggestions,
  AllLikedMessagesByUser,
  AllForYouMessages,
  AllChannelMessages,
  MessageWithFileInputInterface,
} from '../../types';
import {
  CREATE_MESSAGE_MUTATION,
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
  RESTORE_MESSAGE_MUTATION,
  CREATE_MESSAGE_WITH_FILE_MUTATION,
} from '../../mutations';

import {
  GET_CHANNEL_MESSAGES_QUERY,
  GET_FOR_YOU_MESSAGES_QUERY,
  GET_MESSAGE_SEARCH_SUGGESTIONS_QUERY,
  GET_MESSAGES_BY_DISPLAYNAME_AND_SLUG,
  GET_MESSAGES_GROUP_BY_DATE_QUERY,
  GET_MESSAGES_LIKED_BY_USER,
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
        function (error: any) {
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

  public async createMessageWithFile(
    file: File,
    input: MessageWithFileInputInterface
  ): Promise<any> {
    if (!this.options || !this.axiosClient)
      throw new Error('FileSystem module not initialized');

    const formData = new FormData();

    formData.append(
      'operations',
      JSON.stringify({
        query: CREATE_MESSAGE_WITH_FILE_MUTATION,
        variables: {
          input: {
            ...input,
            files: null,
          },
        },
      })
    );

    formData.append('map', JSON.stringify({ '0': ['variables.input.files'] }));
    formData.append('0', file, file.name);

    // Use the existing authAxiosMiddleware function to get the authorization headers
    // This ensures we use the same token retrieval logic as the rest of the application
    let additionalHeaders = {};
    if (this.options.authAxiosMiddleware) {
      try {
        additionalHeaders = await this.options.authAxiosMiddleware();
      } catch (error) {
        console.error('Error getting auth headers:', error);
      }
    }

    const response = await this.axiosClient.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...additionalHeaders
      }
    });

    return response;
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

  public async restoreMessage(id: string): Promise<Boolean> {
    await this.client.mutate({
      mutation: RESTORE_MESSAGE_MUTATION,
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
      requiredTags?: string[]; // New requiredTags filter
      hasType?: WhereCondition;
      childrenOptions?: {
        alias?: string; // Alias for children field
        first?: number; // Limit for children
      };
    } = {}
  ): Promise<AllMessages> {
    const {
      hasAppModuleMessageWhere,
      search,
      hasTags,
      requiredTags,
      hasType,
      where,
      orderBy,
      first = 25,
      page,
      childrenOptions = {},
    } = options;

    const { alias = 'children', first: childrenFirst } = childrenOptions;

    const response = await this.client.query({
      query: GET_MESSAGES_QUERY(childrenFirst !== undefined, alias),
      variables: {
        where,
        hasAppModuleMessageWhere,
        hasTags,
        requiredTags,
        hasType,
        orderBy,
        search,
        first,
        page,
        ...(childrenFirst !== undefined && { childrenFirst }),
      },
      fetchPolicy: 'no-cache',
    });

    return response.data;
  }

  public async getForYouMessages(
    options: {
      where?: WhereCondition;
      orderBy?: Array<OrderByMessage>;
      search?: string;
      first?: number;
      page?: number;
      hasTags?: WhereCondition;
      hasType?: WhereCondition;
      childrenOptions?: {
        alias?: string; // Alias for the children field
        first?: number; // Limit for children
      };
    } = {}
  ): Promise<AllForYouMessages> {
    const {
      search,
      hasTags,
      hasType,
      where,
      orderBy,
      first = 25,
      page,
      childrenOptions = {},
    } = options;

    const { alias = 'children', first: childrenFirst } = childrenOptions;

    const response = await this.client.query({
      query: GET_FOR_YOU_MESSAGES_QUERY(childrenFirst !== undefined, alias),
      variables: {
        where,
        hasTags,
        hasType,
        orderBy,
        search,
        first,
        page,
        ...(childrenFirst !== undefined && { childrenFirst }),
      },
      fetchPolicy: 'no-cache',
    });

    return response.data;
  }

  public async getChannelMessages(
    options: {
      channel_uuid?: string;
      channel_slug?: string;
      where?: Array<WhereCondition>;
      orderBy?: Array<OrderByMessage>;
      first?: number;
      page?: number;
      childrenOptions?: {
        alias?: string; // Alias for the children field
        first?: number; // Limit for children
      };
    } = {}
  ): Promise<AllChannelMessages> {
    const {
      channel_uuid,
      channel_slug,
      where,
      orderBy,
      first = 25,
      page,
      childrenOptions = {},
    } = options;

    const { alias = 'children', first: childrenFirst } = childrenOptions;

    const response = await this.client.query({
      query: GET_CHANNEL_MESSAGES_QUERY(childrenFirst !== undefined, alias),
      variables: {
        channel_uuid,
        channel_slug,
        where,
        orderBy,
        first,
        page,
        ...(childrenFirst !== undefined && { childrenFirst }),
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

  public async getMessagesLikedByUser(
    userId: number,
    options: {
      where?: WhereCondition;
      orderBy?: Array<OrderByMessage>;
      first?: number;
      page?: number;
    } = {}
  ): Promise<AllLikedMessagesByUser> {
    const { where, orderBy, first, page } = options;

    const response = await this.client.query({
      query: GET_MESSAGES_LIKED_BY_USER,
      variables: {
        id: userId,
        where,
        orderBy,
        first,
        page,
      },
      fetchPolicy: 'no-cache',
    });

    return response.data;
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

  public async attachFileToMessage(
    id: string,
    file: File | Buffer,
    fileName?: string
  ): Promise<MessageUploadFiles> {
    if (!this.options || !this.axiosClient) {
      throw new Error('FileSystem module not initialized');
    }

    const isBrowser = typeof window !== 'undefined';
    const formData = new FormData();

    const messageOutputData = `{
      id
      uuid
      parent_id
      slug
      user {
        id
        firstname
        lastname
        displayname
      }
      appModuleMessage {
        entity_id
        system_modules
      }
      message_types_id
      message
      reactions_count
      comment_count
      total_liked
      total_saved
      parent {
        id
        uuid
      }
      files {
        data {
          id
          uuid
          name
          url
        }
      }
    }`;

    formData.append(
      'operations',
      JSON.stringify({
        query: `mutation ($file: Upload!) {
          attachFileToMessage(message_id: "${id}", file: $file) ${messageOutputData}
        }`,
        variables: {
          file: null,
        },
      })
    );

    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));

    if (isBrowser && file instanceof File) {
      formData.append('0', file, file.name);
    } else if (Buffer.isBuffer(file)) {
      if (!fileName) {
        throw new Error('fileName is required when uploading a Buffer');
      }
      formData.append('0', file, { filename: fileName });
    } else {
      throw new Error('Invalid file type: expected File or Buffer');
    }

    const headers = isBrowser ? {} : (formData as any).getHeaders();
    const response = await this.axiosClient.post('', formData, { headers });
    return response.data.data;
  }

  public async getMessageSearchSuggestions(
    search: string
  ): Promise<MessageSearchSuggestions> {
    const response = await this.client.query({
      query: GET_MESSAGE_SEARCH_SUGGESTIONS_QUERY,
      variables: {
        search: search,
      },
    });

    return response.data;
  }
}
