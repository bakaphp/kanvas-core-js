import { ClientType } from '../../index';

import { ChannelInterface, ChannelInputInterface } from '../../types';
import {
  CREATE_SOCIAL_CHANNEL_MUTATION,
  UPDATE_SOCIAL_CHANNEL_MUTATION,
  ATTACH_USER_TO_CHANNEL,
  DETACH_USER_FROM_CHANNEL,
} from '../../mutations';

export class Channels {
  constructor(protected client: ClientType) {}

  public async createChannel(
    input: ChannelInputInterface
  ): Promise<ChannelInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_SOCIAL_CHANNEL_MUTATION,
      variables: { input },
    });
    return response.data.createSocialChannel as ChannelInterface;
  }

  public async updateChannel(
    id: string,
    input: ChannelInputInterface
  ): Promise<ChannelInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_SOCIAL_CHANNEL_MUTATION,
      variables: { id, input },
    });
    return response.data.updateSocialChannel as ChannelInterface;
  }

  public async attachUserToChannel(
    channelId: string,
    userId: string
  ): Promise<ChannelInterface> {
    const response = await this.client.mutate({
      mutation: ATTACH_USER_TO_CHANNEL,
      variables: { channel_id: channelId, user_id: userId },
    });
    return response.data.attachUserToChannel as ChannelInterface;
  }

  public async detachUserFromChannel(
    channelId: string,
    userId: string
  ): Promise<ChannelInterface> {
    const response = await this.client.mutate({
      mutation: DETACH_USER_FROM_CHANNEL,
      variables: { channel_id: channelId, user_id: userId },
    });
    return response.data.detachUserFromChannel as ChannelInterface;
  }
}
