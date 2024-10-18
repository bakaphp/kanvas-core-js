import { UpdateUserParams } from '../src';
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

  it('logs in the user', async () => {
    const client = getClient();
    const testUser = process.env.KANVAS_TEST_USER;
    const testPassword = process.env.KANVAS_TEST_PASSWORD;

    if (!testUser || !testPassword) {
      throw new Error('KANVAS_TEST_USER or KANVAS_TEST_PASSWORD is not defined in environment variables');
    }

    const user = await client.auth.login(testUser, testPassword);
    expect(user).toBeDefined();
    expect(user.token).toBeDefined();
  });

  it('gets user info', async () => {
    const client = getClient();

    //if you pass anything with been a app owner it will return your user
    const userInfo = await client.users.getUserByDisplayName('test');
    expect(userInfo).toBeDefined();
    expect(userInfo.id).toBeDefined();
  });

  it('gets user info by id', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserByDisplayName('test');

    const userById = await client.users.getUserById(userInfo.id);
    expect(userInfo).toBeDefined();
    expect(userInfo.id).toBeDefined();
    expect(userById).toBeDefined();
    expect(userById.id).toBeDefined();
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

  it('update user data', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserData();
    const updatedUserInfo: UpdateUserParams = {
      firstname: 'Max',
      lastname: 'Mustermann',
      phone_number: '123456789',
      welcome: true,
      cell_phone_number: '123456789'
    };

    const updateUser = await client.users.updateUserData(
      userInfo.id,
      updatedUserInfo
    );
    expect(updateUser).toBeDefined();
    expect(updateUser.firstname).toBe('Max');
  });

  it('gets user total following', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserData(true);
    expect(userInfo).toBeDefined();
    expect(userInfo.id).toBeDefined();
    expect(userInfo.social.total_following).toBeDefined();
  });

  it('gets user total followers', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserData(true);
    expect(userInfo).toBeDefined();
    expect(userInfo.id).toBeDefined();
    expect(userInfo.social.total_followers).toBeDefined();
  });

  it('share user profile', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserData();
    const sharedProfile = await client.users.shareUserById(userInfo.id);
    expect(sharedProfile).toBeDefined();
  });

  it('test block user by id', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserByDisplayName('test');

    const blockedUser = await client.users.blockUser(userInfo.id);

    expect(blockedUser).toBeDefined();
  });

  it('test unblock user by id', async () => {
    const client = getClient();
    const userInfo = await client.users.getUserByDisplayName('test');

    const unblockedUser = await client.users.unBlockUser(userInfo.id);

    expect(unblockedUser).toBeDefined();
  });

  it('test get blocked users', async () => {
    const client = getClient();
    const blockedUsers = await client.users.getBlockedUsers();

    expect(blockedUsers.blockedUsers.data).toBeDefined();
  });
});