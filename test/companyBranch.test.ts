import { initializeClient, getClient } from './setupClient';
import path from 'path';
import fs from 'fs';
import { execute } from 'graphql';

beforeAll(async () => {
  await initializeClient(process.env.KANVAS_APP_SECRET!);
});

describe('Test update company branch avatar', () => {
  it('update avatar', async () => {
    const client = getClient();

    const userInfo = await client.users.getUserData(true);

    const filesystem = client.filesystem;

    const csvFilePath = path.join(__dirname + '/files', 'companyPhoto.jpg'); // Adjust the path as needed

    // Read the CSV file
    const file = fs.createReadStream(csvFilePath);

    let buffer = Buffer.alloc(0);
    for await (const chunk of file) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    const companyBranch = await client.companiesBranches.updatePhoto(
      userInfo.default_company_branch.toString(),
      buffer
    );
    expect(companyBranch).toBeDefined();
  });
});
