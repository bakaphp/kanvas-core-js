import { WhereCondition } from '../src';
import { initializeClient, getClient } from './setupClient';

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
        expect(recentMessages.messages.data.length).toBeGreaterThan(0);
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

        const recentMessages = await messages.getMessages({
            search: 'Kanvas'
        });
        expect(recentMessages).toBeDefined();
        expect(recentMessages.messages.data).toBeDefined();
        expect(recentMessages.messages.data.length).toBeGreaterThanOrEqual(0);
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

    it('attach file to message', async () => {
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

      const file = new File(['This is some content'], 'file.txt', {
        type: 'text/plain',
      });

      const attachFileToMessage = await messages.attachFileToMessage(newMessage.id, file);

      console.log(attachFileToMessage);
    //   expect(attachFileToMessage).toBeDefined();
    });
});