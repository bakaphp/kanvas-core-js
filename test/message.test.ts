import { WhereCondition } from '../src';
import { getClient, initializeClient, } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Social Messages', () => {
    it('create a message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);
    });

    it('update a message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const updatedMessage = await messages.updateMessage(newMessage.id, {
            message: 'Hello, Kanvas! Updated',
            message_verb: 'post2',
        });

        expect(updatedMessage).toBeDefined();
        expect(updatedMessage.id).toBeDefined();
        expect(updatedMessage.message).toBe('Hello, Kanvas! Updated');
        expect(updatedMessage.message_types_id).not.toBe(newMessage.message_types_id);
    });

    it('create a message with parent id', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const newChildMessage = await messages.createMessage({
            message_verb: 'post',
            message: 'Hello, Kanvas! Child',
            parent_id: newMessage.id
        });

        expect(newChildMessage).toBeDefined();
        expect(newChildMessage.id).toBeDefined();
        expect(newChildMessage.parent_id).toBe(newMessage.id);
    });

    it('get messages', async () => {
        const client = getClient();
        const messages = client.messages;
        const recentMessages = await messages.getMessages({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1
        }
        );
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data.length).toBeGreaterThan(0);
    });

    it('get message by id', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const whereCondition: WhereCondition = {
            column: 'ID',
            operator: 'EQ',
            value: newMessage.id,
        }
        const recentMessages = await messages.getMessages({
            where: whereCondition,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 1,
            page: 1
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data[0]).toBeDefined();
        expect(recentMessages.messages.data[0].id).toBeDefined();
    });

    it('get message by type id', async () => {
        const client = getClient();

        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post2',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const recentMessages = await messages.getMessages({
            hasType: {
                column: 'VERB',
                operator: 'EQ',
                value: 'post2'
            },
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data.length).toBeGreaterThanOrEqual(0);
    });

    it('get message by type verb', async () => {
        const client = getClient();

        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post2',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const recentMessages = await messages.getMessages({
            where: {
                column: 'USERS_ID',
                operator: 'EQ',
                value: newMessage.user.id,

            } as WhereCondition,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1,
            hasType: { column: 'VERB', operator: 'EQ', value: 'post2' } as WhereCondition
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data.length).toBeGreaterThan(0);
    });

    it('get message by tag', async () => {
        const client = getClient();

        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post2',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const recentMessages = await messages.getMessages({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1,
            hasTags: { column: 'SLUG', operator: 'EQ', value: 'post2' } as WhereCondition,
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data.length).toBeGreaterThanOrEqual(0);
    });

    it('get message by require tag', async () => {
        const client = getClient();

        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post2',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const recentMessages = await messages.getMessages({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1,
            requiredTags: ['post2']
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data.length).toBeGreaterThanOrEqual(0);
    });

    it('search by message', async () => {
        const client = getClient();

        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post2',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        /*         const recentMessages = await messages.getMessages({
                    search: 'Kanvas'
                });
                //console.log(recentMessages);
                expect(recentMessages).toBeDefined();
                expect(recentMessages.messages.data).toBeDefined();
                expect(recentMessages.messages.data.length).toBeGreaterThanOrEqual(0); */
    });

    it('like a message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const likedMessage = await messages.likeMessage(newMessage.id);
        expect(likedMessage).toBeDefined();
    });

    it('get liked messages', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const likedMessage = await messages.likeMessage(newMessage.id);
        expect(likedMessage).toBeDefined();

        const likedMessages = await messages.getMessagesLikedByUser(newMessage.user.id);
        expect(likedMessages).toBeDefined();
        expect(likedMessages.messagesLikedByUser.data).toBeDefined();
        expect(likedMessages.messagesLikedByUser.data.length).toBeGreaterThanOrEqual(0);
    });

    it('dislike a message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const likedMessage = await messages.disLikeMessage(newMessage.id);
        expect(likedMessage).toBeDefined();
    });

    it('view a message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const viewMessage = await messages.viewMessage(newMessage.id);
        expect(viewMessage).toBeDefined();
    });

    it('share a message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const sharedMessage = await messages.shareMessage(newMessage.id);
        expect(sharedMessage).toBeDefined();
    });

    it('get message by slug and displayname', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello Kanvas Time ' + new Date().getTime();
        const slug = messageContent
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');

        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const message = await messages.getMessageByDisplaynameAndSlug(newMessage.user.displayname, slug);
        expect(message).toBeDefined();
    });

    it('get messages group by date', async () => {
        const client = getClient();
        const messages = client.messages;
        const recentMessages = await messages.getMessagesGroupByDate({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messagesGroupByDate.data).toBeDefined();
        expect(recentMessages.messagesGroupByDate.data.length).toBeGreaterThan(0);
    });

    it('get message for you', async () => {
        const client = getClient();
        const messages = client.messages;
        const recentMessages = await messages.getForYouMessages({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1,
            childrenOptions: {
                alias: "children",
                first: 10,
            }
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.forYouMessages.data).toBeDefined();
        expect(recentMessages.forYouMessages.data.length).toBeGreaterThan(0);
    });

    it('get following feed messages', async () => {
        const client = getClient();
        const messages = client.messages;
        const recentMessages = await messages.getFollowingFeedMessages({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1,
            childrenOptions: {
                alias: "children",
                first: 10,
            }
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.followingFeedMessages.data).toBeDefined();
        // expect(recentMessages.followingFeedMessages.data.length).toBeGreaterThan(0);
    });

    it('get message from channel', async () => {
        const client = getClient();
        const messages = client.messages;
        const recentMessages = await messages.getChannelMessages({
            channel_slug: 'general',
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.channelMessages.data).toBeDefined();
    });

    it('test get messages with children', async () => {
        const client = getClient();
        const messages = client.messages;
        const recentMessages = await messages.getMessages({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1,
            childrenOptions: {
                alias: "children_alias",
                first: 1,
            }
        });

        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data.length).toBeGreaterThan(0);
        expect(recentMessages.messages.data[0].children_alias).toBeDefined();
    });

    it('test for you get messages with children', async () => {
        const client = getClient();
        const messages = client.messages;
        const recentMessages = await messages.getForYouMessages({
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            first: 25,
            page: 1,
            childrenOptions: {
                alias: "children_alias",
                first: 1,
            }
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.forYouMessages.data).toBeDefined();
        expect(recentMessages.forYouMessages.data.length).toBeGreaterThan(0);
        expect(recentMessages.forYouMessages.data[0].children_alias).toBeDefined();

    });

    it('delete message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const deleted = await messages.deleteMessage(newMessage.id);
        expect(deleted).toBe(true);
    });

    it('restore message', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const deleted = await messages.deleteMessage(newMessage.id);
        const restore = await messages.restoreMessage(newMessage.id);
        expect(deleted).toBe(true);
        expect(restore).toBe(true);
    });

    it('delete multiple messages', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const deleted = await messages.deleteMultipleMessage([newMessage.id]);
        expect(deleted).toBe(true);
    });

    it('delete all messages', async () => {
        const client = getClient();
        const messages = client.messages;
        const messageContent = 'Hello, Kanvas!';
        const newMessage = await messages.createMessage({
            message_verb: 'post',
            message: messageContent,
        });

        expect(newMessage).toBeDefined();
        expect(newMessage.id).toBeDefined();
        expect(newMessage.message).toBe(messageContent);

        const deleted = await messages.deleteAllMessages();
        expect(deleted).toBe(true);
    });

    it('test message search suggestions', async () => {
        // const client = getClient();
        // const messages = client.messages;
        // const messageContent = 'Hello, Kanvas!';
        // const newMessage = await messages.createMessage({
        //     message_verb: 'post',
        //     message: messageContent,
        // });

        // expect(newMessage).toBeDefined();
        // expect(newMessage.id).toBeDefined();
        // expect(newMessage.message).toBe(messageContent);
        // const suggestions = await messages.getMessageSearchSuggestions("");
        // expect(suggestions).toBeDefined();
        // expect(suggestions.messageSearchSuggestions).toBeDefined();
        // expect(suggestions.messageSearchSuggestions.length).toBeGreaterThanOrEqual(0);
    });
});