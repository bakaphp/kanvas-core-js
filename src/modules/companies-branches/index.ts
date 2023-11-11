import { ClientType } from 'index';

import {
  CREATE_COMPANY_BRANCH,
  UPDATE_COMPANY_BRANCH,
  DELETE_COMPANY_BRANCH,
  ADD_USER_TO_BRANCH,
  REMOVE_USER_FROM_BRANCH,
} from '../../mutations';
import {
  UserInterface,
  CompanyBranchInput,
  CompanyBranchInterface,
  QueryBranchesWhereWhereConditions,
  QueryBranchesOrderByOrderByClause,
  QueryCompanyBranchUsersWhereWhereConditions,
} from '../../types';
import {
  COMPANIES_BRANCHES_QUERY,
  COMPANIES_BRANCHES_USER_QUERY,
} from '../../queries';

export class CompaniesBranches {
  constructor(protected client: ClientType) {}

  public async getCompanyBranches(
    where: QueryBranchesWhereWhereConditions,
    orderBy: QueryBranchesOrderByOrderByClause,
    first?: number,
    page?: number
  ): Promise<CompanyBranchInterface> {
    const response = await this.client.query({
      query: COMPANIES_BRANCHES_QUERY,
      variables: { where, orderBy, first, page },
    });
    return response.data as CompanyBranchInterface;
  }

  public async getCompanyBranchUsers(
    where: QueryCompanyBranchUsersWhereWhereConditions,
    first?: number,
    page?: number
  ): Promise<UserInterface> {
    const response = await this.client.query({
      query: COMPANIES_BRANCHES_USER_QUERY,
      variables: { where, first, page },
    });
    return response.data as UserInterface;
  }

  public async createCompanyBranch(
    input: CompanyBranchInput
  ): Promise<CompanyBranchInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_COMPANY_BRANCH,
      variables: { input },
    });
    return response.data.createCompanyBranch;
  }

  public async updateCompanyBranch(
    id: string,
    input: CompanyBranchInput
  ): Promise<CompanyBranchInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_COMPANY_BRANCH,
      variables: { id: id, input: input },
    });
    return response.data.updateCompanyBranch;
  }

  public async deleteCompanyBranch(id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: DELETE_COMPANY_BRANCH,
      variables: { id: id },
    });
    return response.data.deleteCompanyBranch as Boolean;
  }

  public async addUserToBranch(id: string, user_id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: ADD_USER_TO_BRANCH,
      variables: { id: id, user_id: user_id },
    });
    return response.data.addUserToBranch as Boolean;
  }

  public async removeUserFromBranch(
    id: string,
    user_id: string
  ): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: REMOVE_USER_FROM_BRANCH,
      variables: { id: id, user_id: user_id },
    });
    return response.data.removeUserFromBranch as Boolean;
  }
}
