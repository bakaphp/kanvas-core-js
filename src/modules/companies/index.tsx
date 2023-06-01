import { Base } from "../base";
import { CompanyInterface, CreateCompanyInterface, FormatedResponse, OrderBy, QueryWithPagination, UserInterface, Where } from "../../types";
import { companiesQuery, companyUserQuery } from "../../queries";
import { createCompanyMutation, updateCompanyMutation } from "mutations";

type CompanyResponse = FormatedResponse<CompanyInterface>;
type CompanyUserResponse = FormatedResponse<UserInterface>

export class Companies extends Base {
  async find({ first = 10, page = 1, ...query }: QueryWithPagination): Promise<CompanyResponse> {
    const response = await this.client.query<{ companies: CompanyResponse }>({
      query: companiesQuery,
      variables: {
        ...query,
        first,
        page,
      }
    });

    return response.data.companies;
  }

  async findFirst(where: Where, orderBy: OrderBy): Promise<CompanyInterface> {
    const response = await this.client.query<{ companies: CompanyResponse }>({
      query: companiesQuery,
      variables: {
        where,
        orderBy,
        first: 1,
        page: 1,
      }
    });
    return response.data.companies.data[0];
  }

  async findUsers({ first = 10, page = 1, ...query }: QueryWithPagination): Promise<CompanyUserResponse> {
    const response = await this.client.query<{ companyUsers: CompanyUserResponse }>({
      query: companyUserQuery,
      variables: {
        ...query,
        first,
        page,
      }
    });

    return response.data.companyUsers;
  }

  async create(company: CreateCompanyInterface): Promise<CreateCompanyInterface | undefined> {
    const response = await this.client.mutate<{ createCompany: CreateCompanyInterface }>({
       mutation: createCompanyMutation,
       variables: {
        input: company,
       },
    });

    return response.data?.createCompany
  }

  async update(id: number, company: CreateCompanyInterface): Promise<Partial<CompanyInterface> | undefined> {
    const response = await this.client.mutate<{ updateCompany: Partial<CompanyInterface> }>({
       mutation: updateCompanyMutation,
       variables: {
        id,
        input: company,
       },
    });

    return response.data?.updateCompany
  }

  async delete(id: number): Promise<boolean | undefined> {
    const response = await this.client.mutate<{ deleteCompany: boolean }>({
       mutation: updateCompanyMutation,
       variables: {
        id,
       },
    });

    return response.data?.deleteCompany
  }
}