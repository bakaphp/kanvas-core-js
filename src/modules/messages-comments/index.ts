import { ClientType } from '../../index';
import {
  MessageCommentInputInterface,
  MessageCommentsInterface,
  WhereCondition,
} from '../../types/';
import {
  MESSAGE_COMMENT_MUTATION,
  MESSAGE_COMMENT_UPDATE_MUTATION,
  MESSAGE_COMMENT_DELETE_MUTATION,
} from '../../mutations/';
import { COMMENTS_QUERY } from '../../queries/';
export class MessagesComments {
  constructor(protected client: ClientType) { }

  public async addComment(
    input: MessageCommentInputInterface
  ): Promise<MessageCommentsInterface> {
    const response = await this.client.mutate({
      mutation: MESSAGE_COMMENT_MUTATION,
      variables: { input },
    });

    return response.data.addComment as MessageCommentsInterface;
  }

  public async updateComment(
    id: string,
    input: MessageCommentInputInterface
  ): Promise<MessageCommentsInterface> {
    const response = await this.client.mutate({
      mutation: MESSAGE_COMMENT_UPDATE_MUTATION,
      variables: { id, input },
    });

    return response.data.updateComment as MessageCommentsInterface;
  }

  public async deleteComment(id: string): Promise<MessageCommentsInterface> {
    const response = await this.client.mutate({
      mutation: MESSAGE_COMMENT_DELETE_MUTATION,
      variables: { id },
    });

    return response.data.deleteComment as MessageCommentsInterface;
  }

  public async getComments(
    where: WhereCondition,
    first: number,
    page?: number
  ): Promise<MessageCommentsInterface[]> {
    const response = await this.client.query({
      query: COMMENTS_QUERY,
      variables: { where, first, page },
      fetchPolicy: 'no-cache',
    },
    );

    return response.data.comments.data as MessageCommentsInterface[];
  }
}
