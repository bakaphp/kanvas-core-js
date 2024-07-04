import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
  await initializeClient();
});

describe('Test the KanvasCore client', () => {
  it('initializes correctly', async () => {
    const client = getClient();
    expect(client).toBeDefined();
  });

  it('logs in the user', async () => {
    const client = getClient();
    const user = await client.auth.login('max@mctekk.com', '123456DdD');
    expect(user).toBeDefined();
    expect(user.token).toBeDefined();
  });

  it('gets user info', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserData();
    expect(userInfo).toBeDefined();
    expect(userInfo.id).toBeDefined();
  });
  
  it('gets user info social', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserData(true);
    expect(userInfo).toBeDefined();
    expect(userInfo.id).toBeDefined();
    expect(userInfo.social.total_message).toBeDefined();
  });

  it('user is admin', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserData();
    const isAdmin = client.users.isAdmin(userInfo);
    expect(isAdmin).toBeDefined();
  });
});