import { ClientType } from '../../index';
import { GET_USER_DATA_QUERY, GET_ROLE_ID_BY_NAME_QUERY } from '../../queries';
import {
  REGISTER_MUTATTION,
  FORGOT_PASSWORD_MUTATION,
  UPDATE_USER_MUTATION,
  INVITE_USER_MUTATION,
  SWITCH_COMPANY_BRANCH_MUTATION,
} from '../../mutations';
import {
  UserInterface,
  CreateUserParams,
  CreatedUser,
  UserData,
  UpdateUserParams,
  InviteUserData,
  InviteUserParams,
  WhereCondition,
  RoleData,
  RolesEnum,
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
      fetchPolicy: 'network-only',
    });

    return response.data.me;
  }

  public async getRoleIdByName(name: string): Promise<RoleData> {
    const where: WhereCondition = {
      column: 'NAME',
      operator: 'EQ',
      value: name,
    };

    const response = await this.client.query({
      query: GET_ROLE_ID_BY_NAME_QUERY,
      variables: { where },
    });

    return response.data;
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

  public async invite(inviteInput: InviteUserParams): Promise<InviteUserData> {
    const response = await this.client.mutate({
      mutation: INVITE_USER_MUTATION,
      variables: { input: inviteInput },
    });

    return response.data;
  }

  public async switchCompany(id: number) {
    const response = await this.client.mutate({
      mutation: SWITCH_COMPANY_BRANCH_MUTATION,
      variables: {
        company_branch_id: id,
      },
    });

    return response.data;
  }

  public isAdmin(user: UserData): boolean {
    const roles = user.roles;
    if (Array.isArray(roles)) {
      return roles
        .map(role => role.toLowerCase())
        .includes(RolesEnum.ADMIN.toLowerCase());
    }
    return false;
  }
}
