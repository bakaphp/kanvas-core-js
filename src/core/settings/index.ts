import {
  DELETE_APP_SETTINGS_MUTATION,
  DELETE_COMPANY_SETTINGS_MUTATION,
  DELETE_USER_SETTINGS_MUTATION,
  SET_APP_SETTINGS_MUTATION,
  SET_COMPANY_SETTINGS_MUTATION,
  SET_USER_SETTINGS_MUTATION,
} from "@/graphql/settings.mutation";

import {
  ADMIN_COMPANY_SETTING_QUERY,
  ADMIN_COMPANY_SETTINGS_QUERY,
  APP_SETTING_QUERY,
  APP_SETTINGS_QUERY,
  ConfigInput,
  USERS_SETTINGS_QUERY,
} from "@/graphql/settings.query";

import { Client } from "@/types/app";

class Settings {
  #apolloClient: Client;

  constructor(client: Client) {
    this.#apolloClient = client;
  }

  async appSettings<T extends any = any>() {
    try {
      const { data } = await this.#apolloClient.query({
        query: APP_SETTINGS_QUERY,
        fetchPolicy: "network-only",
      });

      return data as T;
    } catch {
      return null;
    }
  }

  async appSetting<T extends any = any>(name: string) {
    try {
      const { data } = await this.#apolloClient.query({
        query: APP_SETTING_QUERY,
        variables: {
          key: name,
        },
        fetchPolicy: "network-only",
      });

      return data as T;
    } catch {
      return null;
    }
  }

  async getCompanySettings<T extends any = any>(
    entity_uuid: string,
  ) {
    try {
      const { data } = await this.#apolloClient.query({
        query: ADMIN_COMPANY_SETTINGS_QUERY,
        variables: {
          entityUUID: entity_uuid,
        },
        fetchPolicy: "network-only",
      });
      return data as T;
    } catch {
      return null;
    }
  }

  async companySetting<T extends any = any>(
    entity_uuid: string,
    key: string,
  ) {
    try {
      const { data } = await this.#apolloClient.query({
        query: ADMIN_COMPANY_SETTING_QUERY,
        variables: {
          entityUUID: entity_uuid,
          key: key,
        },
        fetchPolicy: "network-only",
      });

      return data as T;
    } catch {
      return null;
    }
  }

  async getUserSettings<T extends any = any>(
    entity_uuid: string,
  ) {
    try {
      const { data } = await this.#apolloClient.query({
        query: USERS_SETTINGS_QUERY,
        fetchPolicy: "network-only",
        variables: {
          entityUUID: entity_uuid,
        },
      });

      return data as T;
    } catch {
      return null;
    }
  }

  async setUserSettings(input: ConfigInput) {
    try {
      await this.#apolloClient.mutate({
        mutation: SET_USER_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });

      return true;
    } catch {
      return null;
    }
  }

  async setAppSetting(input: ConfigInput) {
    try {
      await this.#apolloClient.mutate({
        mutation: SET_APP_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });

      return true;
    } catch {
      return null;
    }
  }

  async deleteAppSetting<T extends any = any>(key: String) {
    try {
      const { data } = await this.#apolloClient.mutate({
        mutation: DELETE_APP_SETTINGS_MUTATION,
        variables: {
          key: key,
        },
      });

      return data as T;
    } catch {
      return null;
    }
  }

  async setCompanySettings(input: ConfigInput): Promise<boolean | null> {
    try {
      await this.#apolloClient.mutate({
        mutation: SET_COMPANY_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });

      return true;
    } catch {
      return null;
    }
  }

  async deleteCompanySettings<T extends any = any>(
    input: ConfigInput,
  ) {
    try {
      const response = await this.#apolloClient.mutate({
        mutation: DELETE_COMPANY_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });

      return response as T;
    } catch {
      return null;
    }
  }
  async deleteUserSettings<T extends any = any>(input: ConfigInput) {
    try {
      const response = await this.#apolloClient.mutate({
        mutation: DELETE_USER_SETTINGS_MUTATION,
        variables: {
          input,
        },
      });

      return response.data as T;
    } catch (err) {
      return null;
    }
  }
}

export function createSettings(client: Client) {
  return new Settings(client);
}
