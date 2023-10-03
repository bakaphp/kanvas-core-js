import { ClientType } from '../../index';

import { CREATE_USER_LIST } from '../../mutations';

import { UserListInput, UserList } from '../../types';

export class UsersLists {
  constructor(protected client: ClientType) {}

  public async createUserList(input: UserListInput): Promise<UserList> {
    const response = await this.client.mutate({
      mutation: CREATE_USER_LIST,
      variables: { input: input },
    });
    return response.data as UserList;
  }
}
