import {
  ATTACH_FILE_MUTATION,
  DETACH_FILE_MUTATION,
  DETACH_FILES_MUTATION,
} from "@/graphql/filesystem.mutation";

import {
  EntityFilesResponse,
  FilesystemAttachInput,
  FilesystemInterface,
  SystemModuleEntityInput,
  UpdateBranchPhotoProfileResponse,
  UpdateCompanyPhotoProfileResponse,
  UpdatePhotoProfileResponse,
  UploadCsvResponse,
  UploadFileResponse,
  WhereCondition,
} from "@/types/filesystem";

import { ENTITY_FILES_QUERY } from "@/graphql/filesystem.query";
import { AxiosInstance } from "axios";
import { Client } from "@/types/app";

class FileSystem {
  #client: Client;
  #axiosClient: AxiosInstance;

  constructor(client: Client) {
    this.#client = client;
    this.#axiosClient = client.axios;
  }

  /**
   * Get files associated with an entity
   */
  public async getEntityFiles(
    entity: SystemModuleEntityInput,
    where?: WhereCondition,
    first?: number,
    page?: number,
  ): Promise<FilesystemInterface[]> {
    const response = await this.#client.query({
      query: ENTITY_FILES_QUERY,
      variables: { entity, where, first, page },
      fetchPolicy: "no-cache",
    });

    const data = response.data as EntityFilesResponse;
    return data.entityFiles.data;
  }

  /**
   * Attach a file to an entity
   */
  public async attachFile(input: FilesystemAttachInput) {
    const response = await this.#client.mutate({
      mutation: ATTACH_FILE_MUTATION,
      variables: { input },
    });

    return response;
  }

  /**
   * Detach a file by UUID
   */
  public async detachFile(uuid: string) {
    const response = await this.#client.mutate({
      mutation: DETACH_FILE_MUTATION,
      variables: { uuid },
    });

    return response;
  }

  /**
   * Detach multiple files by UUIDs
   */
  public async detachFiles(uuids: string[]) {
    const response = await this.#client.mutate({
      mutation: DETACH_FILES_MUTATION,
      variables: { uuids },
    });

    return response;
  }

  /**
   * Upload a file
   */
  public async uploadFile(file: File): Promise<UploadFileResponse> {
    if (!this.#axiosClient) {
      throw new Error("Axios client not initialized");
    }

    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query: `mutation ($file: Upload!) {
          upload(file: $file) {
            id
            uuid
            name
            url
          }
        }`,
        variables: {
          file: null,
        },
      }),
    );

    formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
    formData.append("0", file, file.name);

    const response = await this.#axiosClient.post("/graphql", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.upload;
  }

  /**
   * Upload a CSV file
   * @param data The file to upload (File in browser, Buffer in Node.js)
   */
  public async uploadFileCsv(
    data: File | Buffer,
  ): Promise<UploadCsvResponse> {
    if (!this.#axiosClient) {
      throw new Error("Axios client not initialized");
    }

    const isBrowser = typeof window !== "undefined";
    const formData = new FormData();

    // Handle file based on environment
    if (isBrowser) {
      if (!(data instanceof File)) {
        throw new Error(
          "Expected a File object in browser environment",
        );
      }
      formData.append("0", data, data.name);
    } else {
      if (!Buffer.isBuffer(data)) {
        throw new Error("Expected a Buffer in Node.js environment");
      }
      // In Node.js, you might need to use a library like form-data
      // which has different append signature
      (formData as any).append("0", data, {
        filename: "uploaded_file.csv",
      });
    }

    formData.append(
      "operations",
      JSON.stringify({
        query: "mutation ($file: Upload!) { uploadCsv(file: $file) }",
        variables: { file: null },
      }),
    );

    formData.append("map", JSON.stringify({ "0": ["variables.file"] }));

    const headers = isBrowser ? {} : (formData as any).getHeaders?.() || {};

    const response = await this.#axiosClient.post("/graphql", formData, {
      headers,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  }

  /**
   * Update user profile photo
   */
  public async updateUserPhotoProfile(
    file: File,
    userId: string,
  ): Promise<UpdatePhotoProfileResponse["updatePhotoProfile"]> {
    if (!this.#axiosClient) {
      throw new Error("Axios client not initialized");
    }

    const query = `
      id
      uuid
      firstname
      lastname
      displayname
      default_company
      default_company_branch
      email
      mainRole
      branches {
        id
        name
        phone
      }
      companies {
        id
        name
        uuid
      }
      contact {
        phone_number
        cell_phone_number
      }
      roles
      abilities
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }`;

    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query: `mutation ($file: Upload!) {
          updatePhotoProfile(file: $file, user_id: "${userId}") {
            ${query}
          }
        }`,
        variables: {
          file: null,
        },
      }),
    );

    formData.append(
      "map",
      JSON.stringify({ "0": ["variables.file"] }),
    );
    formData.append("0", file, file.name);

    const response = await this.#axiosClient.post("/graphql", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.updatePhotoProfile;
  }

  /**
   * Update company profile photo
   */
  public async updateCompanyPhotoProfile(
    file: File,
    companyId: string,
  ): Promise<UpdateCompanyPhotoProfileResponse["updateCompanyPhotoProfile"]> {
    if (!this.#axiosClient) {
      throw new Error("Axios client not initialized");
    }

    const query = `
      id
      uuid
      name
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }`;

    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query: `mutation ($file: Upload!) {
          updateCompanyPhotoProfile(file: $file, id: "${companyId}") {
            ${query}
          }
        }`,
        variables: {
          file: null,
        },
      }),
    );

    formData.append(
      "map",
      JSON.stringify({ "0": ["variables.file"] }),
    );
    formData.append("0", file, file.name);

    const response = await this.#axiosClient.post("/graphql", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.updateCompanyPhotoProfile;
  }

  /**
   * Update company branch profile photo
   */
  public async updateCompanyBranchPhotoProfile(
    file: File,
    branchId: string,
  ): Promise<
    UpdateBranchPhotoProfileResponse["updatePhotoProfileToCompanyBranch"]
  > {
    if (!this.#axiosClient) {
      throw new Error("Axios client not initialized");
    }

    const query = `
      id
      uuid
      name
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }`;

    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query: `mutation ($file: Upload!) {
          updatePhotoProfileToCompanyBranch(file: $file, id: "${branchId}") {
            ${query}
          }
        }`,
        variables: { file: null },
      }),
    );

    formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
    formData.append("0", file, file.name);

    const response = await this.#axiosClient.post("/graphql", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.updatePhotoProfileToCompanyBranch;
  }
}

/**
 * Create a FileSystem instance
 */
export function createFileSystem(client: Client) {
  return new FileSystem(client);
}
