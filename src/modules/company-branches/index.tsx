import { addUserToBranchMutation, createCompaniesBranchMutation, deleteCompanyBranchMutation, removeUserToBranchMutation, updateCompaniesBranchMutation } from "../../mutations";
import { companyBranchQuery } from "../../queries";
import { CompanyBranchInterface, FormatedResponse, OrderBy, QueryWithPagination, Where } from "../../types";
import { Base } from "../base";

type BranchResponse = FormatedResponse<CompanyBranchInterface>;
type PartialBranch = Partial<CompanyBranchInterface>;

export class CompanyBranches extends Base {
  async find({ first = 10, page = 1, ...query }: QueryWithPagination): Promise<BranchResponse> {
    const response = await this.client.query<{ branch: BranchResponse }>({
      query: companyBranchQuery,
      variables: {
        ...query,
        first,
        page,
      }
    });

    return response.data.branch;
  }

  async findFirst(where: Where, orderBy: OrderBy): Promise<CompanyBranchInterface> {
    const response = await this.client.query<{ branch: BranchResponse }>({
      query: companyBranchQuery,
      variables: {
        where,
        orderBy,
        first: 1,
        page: 1,
      }
    });

    return response.data.branch.data[0];
  }

  async create(branch: PartialBranch): Promise<CompanyBranchInterface | undefined> {
    const response = await this.client.mutate<{ createCompaniesBranch: CompanyBranchInterface }>({
       mutation: createCompaniesBranchMutation,
       variables: {
        input: branch,
       },
    });

    return response.data?.createCompaniesBranch
  }

  async update(id: number, company: PartialBranch): Promise<Partial<CompanyBranchInterface> | undefined> {
    const response = await this.client.mutate<{ updateCompanyBranch: Partial<CompanyBranchInterface> }>({
       mutation: updateCompaniesBranchMutation,
       variables: {
        id,
        input: company,
       },
    });

    return response.data?.updateCompanyBranch
  }

  async delete(id: number): Promise<boolean | undefined> {
    const response = await this.client.mutate<{ deleteCompany: boolean }>({
       mutation: deleteCompanyBranchMutation,
       variables: {
        id,
       },
    });

    return response.data?.deleteCompany
  }

  async addUser(id: number, userId: number): Promise<boolean> {
    const response = await this.client.mutate<{ addUserToBranch: boolean }>({
      mutation: addUserToBranchMutation,
      variables: {
       id,
       users_id: userId,
      },
   });

   return !!response.data?.addUserToBranch;
  }

  async removeUser(id: number, userId: number): Promise<boolean> {
    const response = await this.client.mutate<{ removeUserFromBranch: boolean }>({
      mutation: removeUserToBranchMutation,
      variables: {
       id,
       users_id: userId,
      },
   });

   return !!response.data?.removeUserFromBranch;
  }
}