import { ClientType } from "../../__index";
import {
  GET_BLOCKED_USERS,
  GET_ROLE_ID_BY_NAME_QUERY,
  GET_USER_BY_DISPLAYNAME,
  GET_USER_BY_ID,
  GET_USER_DATA_QUERY,
  GET_USER_SOCIAL_DATA_QUERY,
  GET_USERS_INVITES_BY_ROLE_ID_QUERY,
  GET_USERS_INVITES_QUERY,
} from "../../queries";
import {
  BLOCK_USER_MUTATION,
  DELETE_INVITE_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  GET_INVITE_MUTATION,
  INVITE_USER_MUTATION,
  LINK_DEVICE_MUTATION,
  PROCESS_INVITE_MUTATION,
  REGISTER_MUTATTION,
  REQUEST_DELETED_ACCOUNT_MUTATION,
  SAVE_USER_APP_PREFERENCES_MUTATION,
  SHARE_USER_MUTATION,
  SOCIAL_LOGIN_MUTATTION,
  SWITCH_COMPANY_BRANCH_MUTATION,
  UNBLOCK_USER_MUTATION,
  UNLINK_DEVICE_MUTATION,
  UPDATE_DISPLAY_NAME_MUTATION,
  UPDATE_EMAIL_MUTATION,
  UPDATE_USER_MUTATION,
  UPDATE_USER_SOCIAL_MUTATION,
} from "../../mutations";
import {
  AllBlockedUsersInterface,
  CreatedUser,
  CreateUserParams,
  DeviceParams,
  InviteData,
  InviteParams,
  InviteProcessData,
  InviteProcessParams,
  OrderBy,
  RoleData,
  RolesEnum,
  SocialLoginData,
  SocialLoginParams,
  UpdateUserParams,
  UserData,
  UserInterface,
  WhereCondition,
} from "../../types";

export class Users {
  constructor(protected client: ClientType) {}

  public async register(
    userData: UserInterface | CreateUserParams,
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

  public async getUserData(withSocial: boolean = false): Promise<UserData> {
    const response = await this.client.query({
      query: !withSocial ? GET_USER_DATA_QUERY : GET_USER_SOCIAL_DATA_QUERY,
      fetchPolicy: "no-cache",
    });

    return response.data.me;
  }

  public async getUserByDisplayName(displayName: string): Promise<UserData> {
    const response = await this.client.query({
      query: GET_USER_BY_DISPLAYNAME,
      variables: {
        displayName,
      },
      fetchPolicy: "no-cache",
    });

    return response.data.userByDisplayName;
  }

  public async getUserById(id: number): Promise<UserData> {
    const response = await this.client.query({
      query: GET_USER_BY_ID,
      variables: {
        id,
      },
      fetchPolicy: "no-cache",
    });

    return response.data.user;
  }

  public async getRoleIdByName(name: string): Promise<RoleData> {
    const where: WhereCondition = {
      column: "NAME",
      operator: "EQ",
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
    updatedUser: UpdateUserParams,
    withSocial: boolean = false,
  ): Promise<UserData> {
    const response = await this.client.mutate({
      mutation: !withSocial
        ? UPDATE_USER_MUTATION
        : UPDATE_USER_SOCIAL_MUTATION,
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
        user_id: id,
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
    order?: { column: string; order: string }[] | undefined;
    where?: WhereCondition;
  }) {
    const response = await this.client.query({
      query: GET_USERS_INVITES_QUERY,
      variables: {
        first,
        page,
        ...(order && {
          orderBy: order,
        }),
        where,
      },
      fetchPolicy: "network-only",
      partialRefetch: true,
    });

    return page ? response.data.usersInvites : response.data.usersInvites.data;
  }

  // Get invites by role id
  public async getUsersInvitesByRoleID(first: number, role_id: number) {
    const where: WhereCondition = {
      column: "ROLE_ID",
      operator: "EQ",
      value: role_id,
    };

    const orderBy: { column: string; order: string }[] = [
      { column: "ID", order: "DESC" },
    ];

    const response = await this.client.query({
      query: GET_USERS_INVITES_BY_ROLE_ID_QUERY,
      variables: { where, first, orderBy },
      fetchPolicy: "network-only",
      partialRefetch: true,
    });

    return response.data.usersInvites.data;
  }

  public async getBlockedUsers(
    options: {
      first?: number;
      page?: number;
      whereCondition?: WhereCondition;
      orderByCondition?: OrderBy[];
    } = {},
  ): Promise<AllBlockedUsersInterface> {
    const {
      first,
      page,
      whereCondition,
      orderByCondition,
    } = options;

    const response = await this.client.query({
      query: GET_BLOCKED_USERS,
      variables: {
        first,
        page,
        whereCondition,
        orderByCondition,
      },
      fetchPolicy: "network-only",
      partialRefetch: true,
    });

    return response.data;
  }

  public async processInvite(
    input: InviteProcessParams,
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
      fetchPolicy: "network-only",
    });

    return response.data;
  }

  public isAdmin(user: UserData): boolean {
    const roles = user.roles;
    if (Array.isArray(roles)) {
      return roles
        .map((role) => role.toLowerCase())
        .includes(RolesEnum.ADMIN.toLowerCase());
    }
    return false;
  }

  /**
   * @deprecated
   */
  public async socialLoging(
    input: SocialLoginParams,
  ): Promise<SocialLoginData> {
    return this.socialLogin(input);
  }

  public async socialLogin(input: SocialLoginParams): Promise<SocialLoginData> {
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

  public async shareUserById(id: number): Promise<string> {
    const response = await this.client.mutate({
      mutation: SHARE_USER_MUTATION,
      variables: { id },
    });
    return response.data.shareUser;
  }

  public async blockUser(id: number | string): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: BLOCK_USER_MUTATION,
      variables: { id },
    });
    return response.data.blockUser;
  }

  public async unBlockUser(id: number | string): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: UNBLOCK_USER_MUTATION,
      variables: { id },
    });
    return response.data.unBlockUser;
  }

  public async updateEmail(email: string): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: UPDATE_EMAIL_MUTATION,
      variables: { email },
    });
    return response.data;
  }

  public async linkDevice(input: DeviceParams): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: LINK_DEVICE_MUTATION,
      variables: { data: input },
    });
    return response.data.linkDevice;
  }

  public async unLinkDevice(input: DeviceParams): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: UNLINK_DEVICE_MUTATION,
      variables: { data: input },
    });
    return response.data.unLinkDevice;
  }

  public async saveUserAppPreferences(preferences: object): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: SAVE_USER_APP_PREFERENCES_MUTATION,
      variables: { preferences: preferences },
    });
    return response.data.saveUserAppPreferences;
  }
}
