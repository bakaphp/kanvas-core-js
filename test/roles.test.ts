import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
  await initializeClient();
});
const roleName = `Role ${Math.random().toFixed(2)}`;
const updatedName = `Updated Role ${Math.random().toFixed(2)}`;

describe('Test the Roles', () => {
  it('create a role', async () => {
    const client = getClient();
    const roles = client.roles;
    const newRole = await roles.createRole({
      name: roleName,
    });

    const createdRoles = await roles.getRoles();

    expect(newRole).toBeDefined();
    expect(newRole.id).toBeDefined();
    expect(newRole.name).toBe(roleName);

    const role = createdRoles.roles.data.find(r => r.name === roleName);

    expect(role).toBeDefined();

    await roles.deleteRole(newRole.id);
  });

  it('get roles', async () => {
    const client = getClient();
    const roles = client.roles;
    const createdRoles = await roles.getRoles();
    expect(createdRoles).toBeDefined();
    expect(createdRoles.roles.data).toBeInstanceOf(Array);
  });

  it('update a role', async () => {
    const client = getClient();
    const roles = client.roles;
    const createdRole = await roles.createRole({
      name: roleName,
    });
    const updatedRole = await roles.updateRole({
      id: createdRole.id,
      name: updatedName,
    });
    expect(updatedRole).toBeDefined();
    expect(updatedRole.name).toBe(updatedName);
    expect(updatedRole.id).toBe(createdRole.id);

    await roles.deleteRole(updatedRole.id);
  });

  it('delete a role', async () => {
    const client = getClient();
    const roles = client.roles;
    const createdRole = await roles.createRole({
      name: roleName,
    });
    const deletedRole = await roles.deleteRole(createdRole.id);
    expect(deletedRole.deleteRole).toBe(true);
  });
});
