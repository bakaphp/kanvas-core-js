import axios from 'axios';

export class Receiver {
  private baseUrl: string;

  constructor(protected url: string) {
    const base = new URL(url);

    this.baseUrl = base.origin || '';
  }

  /**
   * Submit receiver data to the Kanvas API
   * @param uuid - The UUID of the receiver
   * @param data - The receiver data to be submitted
   * @returns A promise that resolves to the API response
   */
  async submitReceiverData(
    uuid: string,
    data: Record<string | number, any>
  ): Promise<any> {
    const url = `${this.baseUrl}/v1/receiver/${uuid}`;

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `API error: ${error.response?.status} ${error.response?.statusText}`
        );
      }
      throw error;
    }
  }
}
