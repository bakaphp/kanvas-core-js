import { ResponseSDK } from './../src/types/types.d';
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
    //const { data } = recentMessages;
  });

  it('get messages group by date', async () => {
    const client = getClient();
    const messages = client.messages;
    const messagesRaw = await messages.getMessagesGroupByDate(
      {} as WhereCondition,
      {} as HasAppModuleMessageWhereConditions,
      [{ column: 'CREATED_AT', order: 'DESC' }],
      '',
      25,
      1
    );

    const recentMessages: ResponseSDK<typeof messagesRaw> = messagesRaw as any /* baseline fix */;

    expect(recentMessages).toBeDefined();

    const { data, paginatorInfo } = recentMessages;
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
});
