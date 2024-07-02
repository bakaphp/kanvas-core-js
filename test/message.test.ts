import { HasAppModuleMessageWhereConditions, WhereCondition } from '../src';
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
        expect(newMessage.message).toBe(messageContent,);
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

    });
});