import { HasAppModuleMessageWhereConditions, HasTagWhereHasConditions, HasTypeWhereHasConditions, WhereCondition } from '../src';
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
        const recentMessages = await messages.getMessages(
            {} as WhereCondition,
            {} as HasAppModuleMessageWhereConditions,
            [{ column: 'CREATED_AT', order: 'DESC' }],
            '',
            25,
            1
        );
        expect(recentMessages).toBeDefined();
        //console.log(recentMessages);
        //const { data } = recentMessages;
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

        const recentMessages = await messages.getMessages(
            {
                column: 'MESSAGE_TYPES_ID',
                operator: 'EQ',
                value: 'post2',
                AND: [
                    {
                        column: 'USERS_ID',
                        operator: 'EQ',
                        value: newMessage.user.id,
                    }
                ],
            } as WhereCondition,
            {} as HasAppModuleMessageWhereConditions,
            [{ column: 'CREATED_AT', order: 'DESC' }],
            '',
            25,
            1
        );
        expect(recentMessages).toBeDefined();
        //console.log(recentMessages);
        //const { data } = recentMessages;
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

        const recentMessages = await messages.getMessages(
            {
                column: 'USERS_ID',
                operator: 'EQ',
                value: newMessage.user.id, 

            } as WhereCondition,
            {} as HasAppModuleMessageWhereConditions,
            [{ column: 'CREATED_AT', order: 'DESC' }],
            '',
            25,
            1,
            {} as HasTagWhereHasConditions,
            {column: 'VERB', operator: 'EQ', value: 'post2'} as HasTypeWhereHasConditions
        );
        expect(recentMessages).toBeDefined();
        //console.log(recentMessages);
        //const { data } = recentMessages;
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

        const recentMessages = await messages.getMessages(
            {} as WhereCondition,
            {} as HasAppModuleMessageWhereConditions,
            [{ column: 'CREATED_AT', order: 'DESC' }],
            '',
            25,
            1,
            {column: 'SLUG', operator: 'EQ', value: 'post2'} as HasTagWhereHasConditions,
        );
        expect(recentMessages).toBeDefined();
        //console.log(recentMessages);
        //const { data } = recentMessages;
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
        const recentMessages = await messages.getMessagesGroupByDate(
            {} as WhereCondition,
            {} as HasAppModuleMessageWhereConditions,
            [{ column: 'CREATED_AT', order: 'DESC' }],
            '',
            25,
            1
        );
        expect(recentMessages).toBeDefined();
        //console.log(recentMessages);
        //const { data } = recentMessages;
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
});