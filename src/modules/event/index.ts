import {
  EVENT_CATEGORIES_QUERY,
  EVENT_PARTICIPANTS_QUERY,
  EVENT_QUERY,
  EVENT_TYPES_QUERY,
} from '../../queries';

import { ClientType } from '../../';

import {
  CreateEventResponse,
  EventInputInterface,
  GetParticipantsByEventId,
  GetEventResponse,
  OrderBy,
  EventTypeInterface,
  EventCategoryInterface,
} from '../../types';

import { CREATE_EVENT_MUTATION } from '../../mutations';

export class Event {
  constructor(protected client: ClientType) {}

  public async createEvent(
    input: EventInputInterface
  ): Promise<CreateEventResponse> {
    const { data } = await this.client.mutate({
      mutation: CREATE_EVENT_MUTATION,
      variables: { input },
    });
    return data.createEvent;
  }

  public async getEvent(
    options: {
      first?: number;
      page?: number;
      orderBy?: Array<OrderBy>;
    } = {}
  ): Promise<GetEventResponse> {
    const { first, page, orderBy } = options;
    const response = await this.client.query({
      query: EVENT_QUERY,
      variables: { first, page, orderBy },
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });
    return response.data.events;
  }

  public async getEventTypes(): Promise<EventTypeInterface[]> {
    const response = await this.client.query({
      query: EVENT_TYPES_QUERY,
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });
    return response.data.eventTypes.data;
  }

  public async getEventCategories(): Promise<EventCategoryInterface[]> {
    const response = await this.client.query({
      query: EVENT_CATEGORIES_QUERY,
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });
    return response.data.eventCategories.data;
  }

  public async getParticipantsByEventId(
    eventId: string
  ): Promise<GetParticipantsByEventId> {
    const { data } = await this.client.query({
      query: EVENT_PARTICIPANTS_QUERY,
      variables: {
        where: { column: 'EVENT_VERSION_ID', operator: 'EQ', value: eventId },
      },
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });
    return data.eventVersionParticipants as GetParticipantsByEventId;
  }
}
