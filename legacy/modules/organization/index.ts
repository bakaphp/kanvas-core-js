import {
  InputOrganizationParams,
  OrganizationInterface,
} from "types/organization";
import { ClientType } from "../../__index";
import { UPDATE_ORGANIZATION_MUTATION } from "../../mutations";

export class Organization {
  constructor(protected client: ClientType) {}

  public async updateOrganization({
    id,
    input,
  }: InputOrganizationParams): Promise<OrganizationInterface> {
    const response = await this.client.mutate({
      mutation: UPDATE_ORGANIZATION_MUTATION,
      variables: { id: id, input: input },
    });
    return response.data.updateCompany as OrganizationInterface;
  }
}
