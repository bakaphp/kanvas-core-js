import { ClientType } from '../../index';
import { SET_CUSTOM_FIELD, GET_CUSTOM_FIELD, DELETE_CUSTOM_FIELD } from '../../mutations';
import { CustomFieldParams, CreatedCustomField, FetchedCustomField, DeletedCustomField } from '../../types';

export class CustomFields {
  constructor(protected client: ClientType) {}

  public async setCustomField(data: CustomFieldParams): Promise<CreatedCustomField> {
    const response = await this.client.mutate({
      mutation: SET_CUSTOM_FIELD, variables: { input: data }
    });
    return response.data as CreatedCustomField;
  }

  public async getCustomField(data: CustomFieldParams): Promise<FetchedCustomField> {
    const response = await this.client.mutate({
      mutation: GET_CUSTOM_FIELD, variables: { input: data }
    });
    return response.data as FetchedCustomField;
  }

  public async deleteCustomField(data: CustomFieldParams): Promise<DeletedCustomField> {
    const response = await this.client.mutate({
      mutation: DELETE_CUSTOM_FIELD, variables: { input: data }
    });
    return response.data as DeletedCustomField;
  }
}