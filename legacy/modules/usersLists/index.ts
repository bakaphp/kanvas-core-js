import { ClientType } from "../../__index";

import {
  ADD_USER_LIST_ITEM,
  CREATE_USER_LIST,
  DELETE_USER_LIST,
  REMOVE_USER_LIST_ITEM,
  UPDATE_USER_LIST,
} from "../../mutations";

import { UserList, UserListInput, WhereCondition } from "../../types";
import { GET_USERS_LISTS } from "../../queries";

export class UsersLists {
  constructor(protected client: ClientType) {}

  public async createUserList(input: UserListInput): Promise<UserList> {
    const response = await this.client.mutate({
      mutation: CREATE_USER_LIST,
      variables: { input: input },
    });
    return response.data.createUserList as UserList;
  }

  public async updateUserList(
    id: string,
    input: UserListInput,
  ): Promise<UserList> {
    const response = await this.client.mutate({
      mutation: UPDATE_USER_LIST,
      variables: { id, input },
    });
    return response.data.updateUserList as UserList;
  }

  public async deleteUserList(id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: DELETE_USER_LIST,
      variables: { id },
    });
    return response.data.deleteUserList as Boolean;
  }

  public async addUserListItem(
    userListId: string,
    messageId: string,
  ): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: ADD_USER_LIST_ITEM,
      variables: { users_lists_id: userListId, messages_id: messageId },
    });
    return response.data.addToUserList as Boolean;
  }

  public async removeUserListItem(
    userListId: string,
    messageId: string,
  ): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: REMOVE_USER_LIST_ITEM,
      variables: { users_lists_id: userListId, messages_id: messageId },
    });
    return response.data.removeFromUserList as Boolean;
  }

  public async getUsersLists(
    where: WhereCondition,
    page: number,
    first: number,
  ): Promise<UserList[]> {
    const response = await this.client.query({
      query: GET_USERS_LISTS,
      variables: { where, page, first },
    });
    return response.data.getUsersLists.data as UserList[];
  }
}
