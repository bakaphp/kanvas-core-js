import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await initializeClient();
});

describe('Test the KanvasCore client', () => {
  it('initializes correctly', async () => {
    const client = getClient();
    expect(client).toBeDefined();
  });

  it('Fetches channel products by channel ID', async () => {
    const client = getClient();
    const channelId = "test-channel-id";
    try {
      const channelProducts = await client.channels.getChannelProducts(channelId);
      expect(channelProducts).toBeDefined();
    } catch (error) {
      console.error('Error fetching channel products:', error);
      expect(error).toBeUndefined();
    }
  });
});
