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
  QueryBranchesOrderByOrderByClause,
  WhereCondition,
} from '../../types';
import {
  COMPANIES_BRANCHES_QUERY,
  COMPANIES_BRANCHES_USER_QUERY,
} from '../../queries';
import axios from 'axios';

import { Options } from '../filesystem/index';

export class CompaniesBranches {
         protected axiosClient: any;

         constructor(
           protected client: ClientType,
           protected options?: Options
         ) {
           if (this.options) {
             this.axiosClient = axios.create({
               baseURL: this.options.url,
               headers: {
                 'X-Kanvas-App': this.options.key,
                 ...(this.options.adminKey && {
                   'X-Kanvas-Key': this.options.adminKey,
                 }),
               },
             });

             this.axiosClient.interceptors.request.use(
               this.options.authAxiosMiddleware,
               function(error: any) {
                 return Promise.reject(error);
               }
             );
           }
         }
         
  public async updatePhoto(
           id: string,
           data: File | Buffer
         ): Promise<CompanyBranchInterface> {
           if (!this.options || !this.axiosClient) {
             throw new Error('FileSystem module not initialized');
           }

           const isBrowser = typeof window !== 'undefined';
           let formData: FormData = new FormData();

           if (isBrowser) {
             formData.append('0', data as File, (data as File).name);
           } else {
             // Node.js environment
             if (!Buffer.isBuffer(data)) {
               throw new Error('Expected a Buffer in Node.js');
             }
             formData.append('0', data, { filename: 'uploaded_file.csv' });
           }

           // Append GraphQL mutation data
           formData.append(
             'operations',
             JSON.stringify({
               query:
                 'mutation ($file: Upload!, $id: ID!) { updatePhotoProfileToCompanyBranch(file: $file, id: $id) }',
               variables: { file: null, id: id },
             })
           );
           formData.append('map', JSON.stringify({ '0': ['variables.file'] }));

           // Make the API request
           const headers = isBrowser ? {} : (formData as any).getHeaders();
           const response = await this.axiosClient.post('', formData, {
             headers,
           });

           return response.data.data as CompanyBranchInterface;
         }

         public async getCompanyBranches(
           options: {
             first?: number;
             page?: number;
             where?: WhereCondition;
             orderBy?: QueryBranchesOrderByOrderByClause[];
             search?: string;
           } = {}
         ): Promise<CompanyBranchInterface> {
           const { first, page, where, orderBy, search } = options;

           const response = await this.client.query({
             query: COMPANIES_BRANCHES_QUERY,
             variables: { where, orderBy, first, page, search },
             fetchPolicy: 'network-only',
             partialRefetch: true,
           });
           return response.data;
         }

         public async getCompanyBranchUsers(
           options: {
             first?: number;
             page?: number;
             where?: WhereCondition;
           } = {}
         ): Promise<UserInterface> {
           const { first, page, where } = options;

           const response = await this.client.query({
             query: COMPANIES_BRANCHES_USER_QUERY,
             variables: { where, first, page },
             fetchPolicy: 'network-only',
             partialRefetch: true,
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
           return response.data.createCompanyBranch as CompanyBranchInterface;
         }

         public async updateCompanyBranch(
           id: string,
           input: CompanyBranchInput
         ): Promise<CompanyBranchInterface> {
           const response = await this.client.mutate({
             mutation: UPDATE_COMPANY_BRANCH,
             variables: { id: id, input: input },
           });
           return response.data.updateCompanyBranch as CompanyBranchInterface;
         }

         public async deleteCompanyBranch(id: string): Promise<Boolean> {
           const response = await this.client.mutate({
             mutation: DELETE_COMPANY_BRANCH,
             variables: { id: id },
           });
           return response.data.deleteCompanyBranch as Boolean;
         }

         public async addUserToBranch(
           id: string,
           user_id: string
         ): Promise<Boolean> {
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
