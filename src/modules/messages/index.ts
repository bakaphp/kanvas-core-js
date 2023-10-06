import { ClientType } from '../../index';

import { MessageInput, MessagesInterface } from '../../types';
import { CREATE_MESSAGE_MUTATION } from '../../mutations';

export default class Messages {
  constructor(protected client: ClientType) {}

  public async createMessage(input: MessageInput): Promise<MessagesInterface> {
    const response = this.client.mutate({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: { input: input },
    });
    return (await response).data.createMessage as MessagesInterface;
  }
}
