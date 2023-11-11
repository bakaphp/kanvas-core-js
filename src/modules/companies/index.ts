import { ClientType } from '../../index';
import {
  CREATE_COMPANY_MUTATION,
  UPDATE_COMPANY_MUTATION,
  DELETE_COMPANY_MUTATION,
  ADD_USER_TO_COMPANY,
  REMOVE_USER_FROM_COMPANY,
} from '../../mutations';
import {
  COMPANIES_QUERY,
  COMPANY_USERS_QUERY,
  COMPANY_SETTINGS_QUERY,
} from '../../queries';

import {
  UserInterface,
  CompanyInput,
  CompanyInterface,
  QueryCompaniesWhereWhereConditions,
  QueryCompanyUsersWhereWhereConditions,
  CompanySettings,
} from '../../types';
import { from } from '@apollo/client';

export class Companies {
  constructor(protected client: ClientType) {}

  public async getCompanies(
    where: QueryCompaniesWhereWhereConditions,
    first?: number,
    page?: number
  ): Promise<CompanyInterface> {
    const response = await this.client.query({
      query: COMPANIES_QUERY,
      variables: { where, first, page },
    });
    return response.data as CompanyInterface;
  }

  public async getCompanyUsers(
    where: QueryCompanyUsersWhereWhereConditions,
    first?: number,
    page?: number
  ): Promise<UserInterface> {
    const response = await this.client.query({
      query: COMPANY_USERS_QUERY,
      variables: { where, first, page },
    });
    return response.data as UserInterface;
  }

  public async getCompanySettings(): Promise<CompanySettings> {
    const response = await this.client.query({
      query: COMPANY_SETTINGS_QUERY,
    });
    return response.data as CompanySettings;
  }

  public async createCompany(input: CompanyInput): Promise<CompanyInterface> {
    const response = await this.client.mutate({
      mutation: CREATE_COMPANY_MUTATION,
      variables: { input },
    });
    return response.data.createCompany as CompanyInterface;
  }

  public async updateCompany(
    id: string,
    input: CompanyInput
  ): Promise<CompanyInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_COMPANY_MUTATION,
      variables: { id: id, input: input },
    });
    return response.data.updateCompany as CompanyInterface;
  }

  public async deleteCompany(id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: DELETE_COMPANY_MUTATION,
      variables: { id: id },
    });
    return response.data.deleteCompany;
  }

  public async addUserToCompany(id: string, user_id: string): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: ADD_USER_TO_COMPANY,
      variables: { id: id, user_id: user_id },
    });
    return response.data.addUserToCompany as Boolean;
  }

  public async removeUserFromCompany(
    id: string,
    user_id: string
  ): Promise<Boolean> {
    const response = await this.client.mutate({
      mutation: REMOVE_USER_FROM_COMPANY,
      variables: { id: id, user_id: user_id },
    });
    return response.data.removeUserFromCompany as Boolean;
  }
}
