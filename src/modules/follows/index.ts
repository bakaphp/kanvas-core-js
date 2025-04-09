import { ClientType } from '../../index';

import { USER_FOLLOW_MUTATION, USER_UNFOLLOW_MUTATION } from '../../mutations/';

import {
  IS_FOLLOWING_QUERY,
  GET_FOLLOWERS_QUERY,
  GET_FOLLOWING_QUERY,
  GET_TOTAL_FOLLOWERS_QUERY,
  GET_FOLLOWING_ENTITY_QUERY,
  USER_RECOMMENDATIONS_QUERY,
} from '../../queries/follows.query';

import { UserInterface, FollowingInterface } from '../../types';
export class Follow {
  constructor(protected client: ClientType) { }

  public async followUser(user_id: number | string): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: USER_FOLLOW_MUTATION,
      variables: { user_id: user_id },
    });
    return response.data.userFollow;
  }

  public async unFollowUser(user_id: number | string): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: USER_UNFOLLOW_MUTATION,
      variables: { user_id: user_id },
    });
    return response.data.userUnFollow;
  }

  public async isFollowing(user_id: number | string): Promise<boolean> {
    const response = await this.client.query({
      query: IS_FOLLOWING_QUERY,
      variables: { user_id: user_id },
    });
    return response.data.isFollowing;
  }

  public async getFollowers(user_id: number | string): Promise<UserInterface[]> {
    const response = await this.client.query({
      query: GET_FOLLOWERS_QUERY,
      variables: { user_id },
      fetchPolicy: 'no-cache',
    });
    return response.data.getFollowers.data;
  }

  public async getFollowing(user_id: number | string): Promise<UserInterface[]> {
    const response = await this.client.query({
      query: GET_FOLLOWING_QUERY,
      variables: { user_id: user_id },
      fetchPolicy: 'no-cache',
    });
    return response.data.getFollowing.data;
  }

  public async getFollowingEntity(user_id: number | string): Promise<FollowingInterface[]> {
    const response = await this.client.query({
      query: GET_FOLLOWING_ENTITY_QUERY,
      variables: { user_id: user_id },
    });
    return response.data.getFollowingEntity.data;
  }

  public async getTotalFollowers(user_id: number | string): Promise<number> {
    const response = await this.client.query({
      query: GET_TOTAL_FOLLOWERS_QUERY,
      variables: { user_id },
    });
    return response.data.getTotalFollowers;
  }

  public async getFollowRecomendations(user_id: number | string, static_recommendation: boolean): Promise<UserInterface[]> {
    const response = await this.client.query({
      query: USER_RECOMMENDATIONS_QUERY,
      variables: { user_id, static_recommendation },
    });
    return response.data.getWhoToFollow.data;
  }
}
