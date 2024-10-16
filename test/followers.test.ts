import { getClient, initializeClient, } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Social Messages', () => {
    it('get followers', async () => {
        const client = getClient();
        const userInfo = await client.users.getUserByDisplayName('test');

        const followers = await client.follow.getFollowers(userInfo.id);

        expect(followers).toBeDefined();
    });

    it('get following', async () => {
        const client = getClient();
        const userInfo = await client.users.getUserByDisplayName('test');

        const following = await client.follow.getFollowing(userInfo.id);

        expect(following).toBeDefined();
    });

    it('get following Entity', async () => {
        const client = getClient();
        const userInfo = await client.users.getUserByDisplayName('test');

        const following = await client.follow.getFollowingEntity(userInfo.id);

        expect(following).toBeDefined();
    });

    it('get total followers', async () => {
        const client = getClient();
        const userInfo = await client.users.getUserByDisplayName('test');

        const totalFollowers = await client.follow.getTotalFollowers(userInfo.id);

        expect(totalFollowers).toBeDefined();
    });

    it('is following user', async () => {
        const client = getClient();
        const userInfo = await client.users.getUserByDisplayName('test');

        const isFollowing = await client.follow.isFollowing(userInfo.id);

        expect(isFollowing).toBeDefined();
    });
});