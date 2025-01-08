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
    const channelId = process.env.KANVAS_CHHANNEL_ID as string;
    if (channelId) {
      const client = getClient();
      const channelProducts = await client.channels.getChannelProducts({
        id: channelId,
        first: 10,
        whereCondition: {
          column: 'UUID',
          operator: 'EQ',
          value: '786dd0f8-eba9-48fd-a87e-497c4c220437',
        },
        page: 1,
      });
      expect(channelProducts).toBeDefined();
    }
  });
});
