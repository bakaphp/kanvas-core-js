import { ClientType } from '../../index';
import {
  GET_USER_DATA_QUERY,
  GET_ROLE_ID_BY_NAME_QUERY,
  GET_USERS_INVITES_QUERY,
  GET_USERS_INVITES_BY_ROLE_ID_QUERY,
} from '../../queries';
import {
  REGISTER_MUTATTION,
  FORGOT_PASSWORD_MUTATION,
  UPDATE_USER_MUTATION,
  INVITE_USER_MUTATION,
  SWITCH_COMPANY_BRANCH_MUTATION,
  GET_INVITE_MUTATION,
  PROCESS_INVITE_MUTATION,
  DELETE_INVITE_MUTATION,
  SOCIAL_LOGIN_MUTATTION,
  REQUEST_DELETED_ACCOUNT_MUTATION,
  UPDATE_DISPLAY_NAME_MUTATION,
} from '../../mutations';
import {
  UserInterface,
  CreateUserParams,
  CreatedUser,
  UserData,
  UpdateUserParams,
  WhereCondition,
  RoleData,
  RolesEnum,
  InviteProcessParams,
  InviteParams,
  InviteProcessData,
  InviteData,
  SocialLoginData,
  SocialLoginParams,
} from '../../types';

export class Users {
  constructor(protected client: ClientType) { }

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

  public async updateDisplayName(id: number, displayName: string) {
    await this.client.mutate({
      mutation: UPDATE_DISPLAY_NAME_MUTATION,
      variables: {
        id,
        displayname: displayName,
      },
    });
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

  public async invite(inviteInput: InviteParams): Promise<InviteData> {
    const response = await this.client.mutate({
      mutation: INVITE_USER_MUTATION,
      variables: { input: inviteInput },
    });

    return response.data.inviteUser;
  }

  public async getInvite(hash: string): Promise<InviteData> {
    const response = await this.client.mutate({
      mutation: GET_INVITE_MUTATION,
      variables: { hash },
    });

    return response.data.getInvite;
  }

  public async getUsersInvites({
    first,
    page,
    order,
    where,
  }: {
    first: number;
    page?: number;
    order?: 'DESC' | 'ASC';
    where?: WhereCondition;
  }) {
    const sort = order
      ? [{ column: 'ID', order: order }]
      : [{ column: 'ID', order: 'DESC' }];
    const response = await this.client.query({
      query: GET_USERS_INVITES_QUERY,
      variables: {
        first,
        page,
        orderBy: sort,
        where
      },
    });

    return page ? response.data.usersInvites : response.data.usersInvites.data;
  }

  // Get invites by role id
  public async getUsersInvitesByRoleID(first: number, role_id: number) {
    const where: WhereCondition = {
      column: 'ROLE_ID',
      operator: 'EQ',
      value: role_id,
    };

    const orderBy: { column: string; order: string }[] = [
      { column: 'ID', order: 'DESC' },
    ];

    const response = await this.client.query({
      query: GET_USERS_INVITES_BY_ROLE_ID_QUERY,
      variables: { where, first, orderBy },
    });

    return response.data.usersInvites.data;
  }

  public async processInvite(
    input: InviteProcessParams
  ): Promise<InviteProcessData> {
    const response = await this.client.mutate({
      mutation: PROCESS_INVITE_MUTATION,
      variables: { input },
    });
    return response.data.processInvite;
  }

  public async deleteInvite(id: number) {
    const response = await this.client.mutate({
      mutation: DELETE_INVITE_MUTATION,
      variables: { id },
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

  public async socialLoging(
    input: SocialLoginParams
  ): Promise<SocialLoginData> {
    const response = await this.client.mutate({
      mutation: SOCIAL_LOGIN_MUTATTION,
      variables: { input },
    });
    return response.data;
  }

  public async requestDeletedAccount() {
    const response = await this.client.mutate({
      mutation: REQUEST_DELETED_ACCOUNT_MUTATION,
    });
    return response.data;
  }

}
