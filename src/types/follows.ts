import { UserInterface } from './users';

export interface FollowingInterface {
  id: number;
  users_id: number;
  entity_namespace: string;
  entity_id: number;
  entity: UserInterface;
}

export interface FollowInputInterface {
  user_id: number;
  entity_id: any;
}
