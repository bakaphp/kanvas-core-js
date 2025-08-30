import { PaginatorInfo } from "./paginator";

export interface EventInputInterface {
  name: string;
  description: string;
  category_id: string | undefined;
  type_id: string | undefined;
  dates: {
    date: string;
    start_time: string;
    end_time: string;
  }[];
}

export interface EventInterface {
  id: string;
  name: string;
  description: string;
  type: EventTypeInterface;
  eventStatus: EventStatusInterface;
  created_at?: string;
  updated_at?: string;
}

export interface GetEventResponse {
  data: EventInterface[];
  paginatorInfo?: PaginatorInfo;
}

export type CreateEventResponse =
  & Partial<EventInterface>
  & Partial<{
    errors: {
      message: string;
      path: string[];
    }[];
  }>;

export type ParticipantInterface = {
  id: string;
  people: {
    name: string;
    contacts: {
      type: {
        name: string;
      };
      value: string | number;
    }[];
    tags: {
      data: {
        id: string;
        name: string;
      }[];
    };
    custom_fields: {
      name: string;
      value: string | number;
    }[];
  };
  company: {
    name: string;
  };
};
export type GetParticipantsByEventId = {
  data: {
    participant: ParticipantInterface;
  }[];
  paginatorInfo?: PaginatorInfo;
}[];

export type getParticipantsByEventIdProps = {
  eventId?: number | undefined;
  first?: number;
  page?: number;
};

export interface EventCategoryInterface {
  id: string;
  name: string;
}
export interface EventStatusInterface {
  id: string;
  name: string;
}
export interface EventTypeInterface {
  id: string;
  name: string;
}
