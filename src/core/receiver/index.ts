import { ReceiverDataInput, ReceiverResponse } from "@/types/receiver";
import { Client } from "@/types/app";

class Receiver {
  #axiosClient: any;

  constructor(client: Client) {
    this.#axiosClient = client.axios;
  }

  /**
   * Submit receiver data to the Kanvas API
   * @param uuid - The UUID of the receiver
   * @param data - The receiver data to be submitted
   * @returns A promise that resolves to the API response
   */
  public async submitReceiverData(
    uuid: string,
    data: any,
  ): Promise<ReceiverResponse> {
    const url = `/v1/receiver/${uuid}`;

    try {
      const response = await this.#axiosClient.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `API error: ${error.response.status} ${error.response.statusText}`,
        );
      }
      throw error;
    }
  }

  /**
   * Submit receiver data with custom headers
   * @param uuid - The UUID of the receiver
   * @param data - The receiver data to be submitted
   * @param headers - Additional headers to include in the request
   * @returns A promise that resolves to the API response
   */
  public async submitReceiverDataWithHeaders(
    uuid: string,
    data: any,
    headers: Record<string, string> = {},
  ): Promise<ReceiverResponse> {
    const url = `/v1/receiver/${uuid}`;

    try {
      const response = await this.#axiosClient.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `API error: ${error.response.status} ${error.response.statusText}`,
        );
      }
      throw error;
    }
  }
}

/**
 * Create a Receiver instance
 */
export function createReceiver(
  client: Client,
) {
  return new Receiver(client);
}
