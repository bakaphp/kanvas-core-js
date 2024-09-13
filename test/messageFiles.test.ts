import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient(process.env.KANVAS_APP_SECRET!);
});

describe('Test the Social Messages Upload', () => {
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
        expect(attachFileToMessage.attachFileToMessage.id).toBeDefined();
        expect(attachFileToMessage.attachFileToMessage.message).toBe(messageContent);
        expect(attachFileToMessage.attachFileToMessage.files.data.length).toBe(1);
        expect(attachFileToMessage.attachFileToMessage.files.data[0].name).toBe('file.txt');
    });
});