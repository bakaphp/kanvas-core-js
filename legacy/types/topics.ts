import { CompanyInterface, UserInterface } from "./index";

export interface TopicsInterface {
  id: string;
  user: UserInterface;
  company: CompanyInterface;
  name: string;
  slug: string;
  weight: number;
  is_feature: number;
  status: boolean;
}

export interface TopicInputInterface {
  name: string;
  slug: string;
  weight: number;
  is_feature: number;
  status: boolean;
}

export interface QueryGetTopicsWhereInterface {
  column: string;
  operator: string;
  value: string;
  AND: [QueryGetTopicsWhereInterface];
  OR: [QueryGetTopicsWhereInterface];
}
