import { getClient, initializeClient } from './setupClient';
import fs from 'fs';
import path from 'path';

beforeAll(async () => {
  await initializeClient(process.env.KANVAS_APP_SECRET!);
});

describe('Test the Social Messages Upload', () => {
  it('attach file to message', async () => {
    const client = getClient();
    const messages = client.messages;
    const messageContent = 'Hello, Kanvas!';

    // Create a new message
    const newMessage = await messages.createMessage({
      message_verb: 'post',
      message: messageContent,
    });

    expect(newMessage).toBeDefined();
    expect(newMessage.id).toBeDefined();
    expect(newMessage.message).toBe(messageContent);

    // Path to the file you want to attach
    const filePath = path.join(__dirname, '/files', 'file.txt'); // Adjust the file path as needed

    // Use fs.createReadStream to create a ReadStream for the file
    const fileStream = fs.createReadStream(filePath);
    let buffer = Buffer.alloc(0);
    for await (const chunk of fileStream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    // Attach the file stream to the message
    const attachFileToMessage = await messages.attachFileToMessage(
      newMessage.id,
      buffer,
      "file.txt"
    );

    // Assertions to check the response
    expect(attachFileToMessage.attachFileToMessage.id).toBeDefined();
    expect(attachFileToMessage.attachFileToMessage.message).toBe(
      messageContent
    );
    expect(attachFileToMessage.attachFileToMessage.files.data.length).toBe(1);
    expect(attachFileToMessage.attachFileToMessage.files.data[0].name).toBe(
      path.basename(filePath)
    ); // Expect 'file.txt'
  });
});
