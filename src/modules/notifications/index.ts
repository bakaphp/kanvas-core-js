import { ClientType } from 'index';

import {
  NOTIFICATION_QUERY,
  NOTIFICATION_TYPE_QUERY,
  NOTIFICATION_CHANNEL_QUERY,
} from '../../queries';

import {
  NotificationInterface,
  NotificationTypeInterface,
  NotificationChannelInterface,
  NotificationEntityFilterInputInterface,
  NotificationTypeFilterInputInterface,
  SystemModuleFilterInputInterface,
  InteractionsFilterInputInterface,
  WhereCondition,
} from '../../types';

import {
  READ_ALL_NOTIFICATIONS_MUTATION,
  SEND_NOTIFICATION_BASE_TEMPLATE_MUTATION,
  SEND_NOTIFICATION_BY_MESSAGE_MUTATION,
  SEND_ANONYMOUS_NOTIFICATION_MUTATION,
} from '../../mutations';

export class Notifications {
  constructor(protected client: ClientType) {}

  public async getNotifications(
    where: WhereCondition,
    whereEntity: NotificationEntityFilterInputInterface,
    whereType: NotificationTypeFilterInputInterface,
    whereSystemModule: SystemModuleFilterInputInterface,
    whereInteraction: InteractionsFilterInputInterface,
    first: number,
    page: number
  ): Promise<NotificationInterface[]> {
    const response = await this.client.query({
      query: NOTIFICATION_QUERY,
      variables: { where, first, page, whereEntity, whereSystemModule, whereInteraction, whereType },
    });
    return response.data.notifications.data as NotificationInterface[];
  }

  public async getNotificationTypes(
    where: WhereCondition,
    first: number,
    page: number
  ): Promise<NotificationTypeInterface[]> {
    const response = await this.client.query({
      query: NOTIFICATION_TYPE_QUERY,
      variables: { where, first, page },
    });
    return response.data.notificationTypes.data as NotificationTypeInterface[];
  }

  public async getNotificationChannels(
    where: WhereCondition,
    first: number,
    page: number
  ): Promise<NotificationChannelInterface[]> {
    const response = await this.client.query({
      query: NOTIFICATION_CHANNEL_QUERY,
      variables: { where, first, page },
    });
    return response.data.notificationChannels
      .data as NotificationChannelInterface[];
  }

  public async readAllNotifications(): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: READ_ALL_NOTIFICATIONS_MUTATION,
    });
    return response.data.readAllNotifications as boolean;
  }

  public async sendNotificationBaseTemplate(
    template_name: string,
    data: any,
    via: string[],
    users: number | string[]
  ): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: SEND_NOTIFICATION_BASE_TEMPLATE_MUTATION,
      variables: { template_name, data, via, users },
    });
    return response.data.sendNotificationBaseOnTemplate as boolean;
  }

  public async sendNotificationByMessage(
    message: string,
    via: string[],
    users_id: number[]
  ): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: SEND_NOTIFICATION_BY_MESSAGE_MUTATION,
      variables: { message, via, users_id },
    });
    return response.data.sendNotificationByMessage as boolean;
  }

  public async sendAnonymousNotificationBaseOnTemplate(
    template_name: string,
    data: any,
    email: string,
    subject: string
  ): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: SEND_ANONYMOUS_NOTIFICATION_MUTATION,
      variables: { template_name, data, email, subject },
    });
    return response.data.sendNotificationAnonymousBaseOnTemplate as boolean;
  }
}
