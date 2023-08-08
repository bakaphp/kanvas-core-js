import { ClientType } from '../../index';
import { GET_USER_DATA_QUERY } from '../../queries';
import {
  REGISTER_MUTATTION,
  FORGOT_PASSWORD_MUTATION,
  UPDATE_USER_MUTATION,
  INVITE_USER_MUTATION
} from '../../mutations';
import {
  UserInterface,
  CreateUserParams,
  CreatedUser,
  UserData,
  UpdateUserParams,
  InviteUserData, 
  InviteUserParams
} from '../../types';

export class Users {
  constructor(protected client: ClientType) {}

  public async register(
    userData: UserInterface | CreateUserParams
  ): Promise<CreatedUser> {
    const response = await this.client.mutate({
      mutation: REGISTER_MUTATTION,
      variables: { data: userData },
    });
    return response.data as CreatedUser;
  }

  public async forgotPassword(email: string): Promise<void> {
    await this.client.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: { data: { email } },
    });
  }

  public async getUserData(): Promise<UserData> {
    const response = await this.client.query({
      query: GET_USER_DATA_QUERY,
    });

    return response.data.me;
  }

  public async updateUserData(
    id: number,
    updatedUser: UpdateUserParams
  ): Promise<UserData> {
    const response = await this.client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        id,
        data: updatedUser,
      },
    });

    return response.data.updateUser;
  }

public async invite(
    inviteInput: InviteUserParams 
  ): Promise<InviteUserData> {
    const response = await this.client.mutate({
        mutation: INVITE_USER_MUTATION,
        variables: { input: inviteInput },
    });

    return response.data 
  }
  
}
