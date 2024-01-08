import { ClientType } from 'index';
import {
  MessageTypeInterface,
  CreateMessageTypeInputInterface,
  WhereCondition,
} from '../../types';
import {
  CREATE_MESSAGE_TYPE_MUTATION,
  UPDATE_MESSAGE_TYPE_MUTATION,
} from '../../mutations';
import { MESSAGES_TYPES_QUERY } from '../../queries';

export class MessagesTypes {
  constructor(protected client: ClientType) {}

  public async createMessageType(
    input: CreateMessageTypeInputInterface
  ): Promise<MessageTypeInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_MESSAGE_TYPE_MUTATION,
      variables: { input: input },
    });
    return response.data.createMessageType as MessageTypeInterface;
  }

  public async updateMessageType(
    id: number,
    input: CreateMessageTypeInputInterface
  ): Promise<MessageTypeInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_MESSAGE_TYPE_MUTATION,
      variables: { id: id, input: input },
    });
    return response.data.updateMessageType as MessageTypeInterface;
  }

  public async getMessageTypes(
    where?: WhereCondition
  ): Promise<MessageTypeInterface[]> {
    const response = await this.client.query({
      query: MESSAGES_TYPES_QUERY,
      variables: { where: where },
    });
    return response.data.messageTypes as MessageTypeInterface[];
  }
}
