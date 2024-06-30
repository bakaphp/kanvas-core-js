# Kanvas Core JS
## Introduction

Welcome to the documentation for the Kanvas SDK, a TypeScript SDK designed exclusively to seamlessly connect with the Kanvas Niche ecosystem. This SDK is crafted to enhance the development of headless applications by providing easy-to-use interfaces for interacting with various modules within the Kanvas Niche ecosystem.

Here's a comprehensive README.md for Kanvas Core JS with documentation for all modules, including examples and tips:

# Kanvas Core JS

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Core Modules](#core-modules)
   - [App](#app)
   - [Auth](#auth)
   - [Users](#users)
   - [CustomFields](#customfields)
   - [Locations](#locations)
   - [Companies](#companies)
   - [CompaniesBranches](#companiesbranches)
   - [Leads](#leads)
   - [Inventory](#inventory)
   - [Agents](#agents)
   - [Commerce](#commerce)
   - [UsersLists](#userslists)
   - [Messages](#messages)
   - [Roles](#roles)
   - [FileSystem](#filesystem)
   - [Topics](#topics)
   - [SystemModules](#systemmodules)
   - [Follow](#follow)
   - [People](#people)
   - [Notifications](#notifications)
   - [Channels](#channels)
   - [Organization](#organization)
   - [Tags](#tags)
5. [Tips and Best Practices](#tips-and-best-practices)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contributing)
8. [Support](#support)

## Introduction

Kanvas Core JS is a powerful TypeScript SDK for seamless integration with the Kanvas Niche ecosystem. It provides a comprehensive set of modules for building robust applications.

## Installation

```bash
npm install @kanvas/core
```

## Configuration

Initialize the SDK:

```typescript
import KanvasCore, { genericAuthMiddleware } from '@kanvas/core';

const getAuthToken = async () => localStorage.getItem("token") || null;

const kanvas = new KanvasCore({
  url: 'YOUR_KANVAS_URL',
  key: 'YOUR_KANVAS_API_KEY',
  middlewares: [genericAuthMiddleware(getAuthToken)],
  adminKey: 'OPTIONAL_ADMIN_KEY',
});
```

## Core Modules

### App

Manage application-level operations.

```typescript
// Create a new app
const newApp = await kanvas.app.createApp({
  name: 'MyApp',
  url: 'https://myapp.com',
  description: 'App description',
  domain: 'myapp.com',
  is_actived: true,
  ecosystem_auth: true,
  payments_active: false,
  is_public: true,
  domain_based: false
});

// Get apps with access
const apps = await kanvas.app.getAppsWithAccess();
```

### Auth

Handle authentication and sessions.

```typescript
// Login
const session = await kanvas.auth.login('user@example.com', 'password');

// Logout
await kanvas.auth.logout();

// Refresh token
const newToken = await kanvas.auth.refreshToken('current_refresh_token');

// Reset password
await kanvas.auth.resetPassword('reset_hash', 'newPassword', 'newPassword');
```

### Users

Manage user accounts and profiles.

```typescript
// Register new user
const newUser = await kanvas.users.register({
  email: 'newuser@example.com',
  password: 'securePassword',
  firstname: 'John',
  lastname: 'Doe'
});

// Get current user data
const userData = await kanvas.users.getUserData();

// Update user profile
const updatedUser = await kanvas.users.updateUserData(userId, {
  firstname: 'Jane',
  lastname: 'Doe',
  displayname: 'JaneDoe'
});

// Invite a user
const invite = await kanvas.users.invite({
  email: 'invite@example.com',
  firstname: 'Invited',
  lastname: 'User',
  role_id: 1
});
```

### CustomFields

Manage custom fields for entities.

```typescript
// Set a custom field
await kanvas.customFields.setCustomField({
  name: 'customField',
  data: 'fieldValue',
  system_module_uuid: 'moduleUUID',
  entity_id: 'entityId'
});

// Get a custom field
const customField = await kanvas.customFields.getCustomField({
  name: 'customField',
  system_module_uuid: 'moduleUUID',
  entity_id: 'entityId'
});
```

### Locations

Manage geographical data.

```typescript
// Get all countries
const countries = await kanvas.locations.getAllCountries();

// Get states for a country
const states = await kanvas.locations.getStatesByCountry(countryId);
```

### Companies

Manage company data.

```typescript
// Create a company
const newCompany = await kanvas.companies.createCompany({
  name: 'New Company',
  website: 'https://newcompany.com',
  address: '123 Company St',
  zipcode: '12345',
  email: 'info@newcompany.com'
});

// Get companies
const companies = await kanvas.companies.getCompanies({
  first: 10,
  page: 1,
  where: { column: 'IS_ACTIVE', operator: 'EQ', value: true }
});
```

### CompaniesBranches

Manage company branches.

```typescript
// Create a branch
const newBranch = await kanvas.companiesBranches.createCompanyBranch({
  name: 'New Branch',
  companies_id: 'companyId',
  address: '456 Branch Ave',
  is_default: false
});

// Get branches
const branches = await kanvas.companiesBranches.getCompanyBranches({
  first: 10,
  page: 1,
  where: { column: 'COMPANIES_ID', operator: 'EQ', value: 'companyId' }
});
```

### Leads

Manage sales leads.

```typescript
// Create a lead
const newLead = await kanvas.leads.createLead({
  title: 'New Lead',
  branch_id: 1,
  pipeline_stage_id: 1,
  people: { firstname: 'John', lastname: 'Doe' },
  organization: { name: 'Lead Org' },
  custom_fields: [{ name: 'Source', data: 'Website' }]
});

// Get leads
const leads = await kanvas.leads.getAllLeads(10, 1);
```

### Inventory

Manage product inventory.

```typescript
// Create a product
const newProduct = await kanvas.inventory.createProduct({
  name: 'New Product',
  description: 'Product description',
  products_types_id: 1,
  is_published: true
});

// Get products
const products = await kanvas.inventory.getProduct({
  first: 10,
  page: 1,
  whereCondition: { column: 'IS_PUBLISHED', operator: 'EQ', value: true }
});
```

### Agents

Manage sales agents.

```typescript
// Get all agents
const agents = await kanvas.agents.getAllAgents(10, 1);

// Get agents by user ID
const userAgents = await kanvas.agents.getAgentsByUserID('userId');
```

### Commerce

Handle e-commerce operations.

```typescript
// Add to cart
await kanvas.cart.addToCart({
  input: [{ quantity: 2, variant_id: 'variantId' }]
});

// Create an order
const order = await kanvas.order.createOrder({
  input: {
    cartId: 'default',
    payment: {
      name: 'John Doe',
      number: '4111111111111111',
      exp_month: 12,
      exp_year: 2025,
      cvv: 123
    }
  }
});
```

### UsersLists

Manage user-created lists.

```typescript
// Create a list
const newList = await kanvas.usersLists.createUserList({
  name: 'My List',
  description: 'List description',
  is_public: true,
  is_default: false
});

// Get lists
const lists = await kanvas.usersLists.getUsersLists(
  { column: 'USER_ID', operator: 'EQ', value: 'userId' },
  1,
  10
);
```

### Messages

Handle messaging functionality.

```typescript
// Create a message
const newMessage = await kanvas.messages.createMessage({
  message_verb: 'POST',
  message: 'Hello, world!',
  system_modules_id: 'moduleId',
  entity_id: 'entityId'
});

// Get messages
const messages = await kanvas.messages.getMessages(
  { column: 'ENTITY_ID', operator: 'EQ', value: 'entityId' },
  { column: 'SYSTEM_MODULES_ID', operator: 'EQ', value: 'moduleId' },
  [{ column: 'CREATED_AT', order: 'DESC' }],
  'search term',
  10,
  1
);
```

### Roles

Manage user roles and permissions.

```typescript
// Get roles
const roles = await kanvas.roles.getRoles();

// Assign role to user
await kanvas.roles.assignRoleUser({ userId: 'userId', role: 'roleId' });

// Create a role
const newRole = await kanvas.roles.createRole({ name: 'New Role' });
```

### FileSystem

Handle file operations.

```typescript
// Upload a file
const uploadedFile = await kanvas.filesystem.uploadFile(fileData);

// Get entity files
const files = await kanvas.filesystem.getEntityFiles({
  name: 'entity_name',
  data: 'entity_data',
  system_module_uuid: 'moduleUUID',
  entity_id: 'entityId'
});
```

### Topics

Manage discussion topics.

```typescript
// Create a topic
const newTopic = await kanvas.topics.createTopic({
  name: 'New Topic',
  slug: 'new-topic',
  weight: 1,
  is_feature: 1,
  status: true
});

// Get topics
const topics = await kanvas.topics.getTopics({
  column: 'STATUS',
  operator: 'EQ',
  value: true
});
```

### SystemModules

Manage system modules.

```typescript
// Get modules
const modules = await kanvas.systemModules.getSystemModules(10, 1);

// Get module by slug
const module = await kanvas.systemModules.getSystemModulesBySlug('module-slug');
```

### Follow

Manage follow relationships.

```typescript
// Follow a user
await kanvas.follow.followUser(userId);

// Get followers
const followers = await kanvas.follow.getFollowers(userId);
```

### People

Manage people records.

```typescript
// Create a person
const newPerson = await kanvas.people.createPeople({
  firstname: 'John',
  lastname: 'Doe',
  contacts: [{ value: 'john@example.com', contacts_types_id: 1 }]
});

// Get people
const people = await kanvas.people.getPeople({
  first: 10,
  page: 1,
  where: { column: 'LASTNAME', operator: 'EQ', value: 'Doe' }
});
```

### Notifications

Handle system notifications.

```typescript
// Get notifications
const notifications = await kanvas.notifications.getNotifications(
  { column: 'IS_READ', operator: 'EQ', value: false },
  { nested_key: 'entity.id', value: 'entityId' },
  { verb: 'created', event: 'new_message' },
  10,
  1
);

// Send notification
await kanvas.notifications.sendNotificationBaseTemplate(
  'welcome_template',
  { user_name: 'John' },
  ['email'],
  [userId]
);
```

### Channels

Manage communication channels.

```typescript
// Create a channel
const newChannel = await kanvas.channels.createChannel({
  name: 'New Channel',
  slug: 'new-channel',
  description: 'Channel description',
  entity_namespace_uuid: 'namespaceUUID',
  entity_id: 'entityId'
});

// Get channels
const channels = await kanvas.channels.getChannels(
  { column: 'ENTITY_ID', operator: 'EQ', value: 'entityId' },
  10,
  1
);
```

### Organization

Manage organization-related operations.

```typescript
// Update organization
const updatedOrg = await kanvas.organization.updateOrganization({
  id: 'orgId',
  input: {
    name: 'Updated Org Name',
    address: 'New Address'
  }
});
```

### Tags

Manage tagging functionality.

```typescript
// Create a tag
const newTag = await kanvas.tags.createTag({
  name: 'New Tag',
  slug: 'new-tag',
  weight: 1
});

// Get tags
const tags = await kanvas.tags.getTags({
  where: { column: 'IS_ACTIVE', operator: 'EQ', value: true }
});
```

## Tips and Best Practices

1. Always handle errors using try-catch blocks.
2. Use pagination for large data sets to improve performance.
3. Implement proper authentication and keep tokens secure.
4. Utilize custom fields for extending entity properties.
5. Regularly refresh authentication tokens to maintain security.
6. Use appropriate data filtering and sorting in queries.
7. Implement proper access control using roles and permissions.

## Troubleshooting

- **Authentication Issues**: Ensure your API key and tokens are correct and not expired.
- **Rate Limiting**: Implement proper request throttling to avoid hitting rate limits.
- **Data Inconsistencies**: Always validate input data before sending requests.
- **Performance Issues**: Use pagination and limit the amount of data requested when possible.

Remember to replace placeholder values (like 'YOUR_KANVAS_URL') with actual values. This README provides a comprehensive overview of the Kanvas Core JS SDK, its modules, and how to use them. Always refer to the latest API documentation for the most up-to-date information on available methods and their parameters.


## API Reference

For a comprehensive list of available methods and their descriptions, refer to the [API Reference](https://documenter.getpostman.com/view/15472655/2s93CKNtdP). 

## Contribution Guidelines

If you'd like to contribute to the Kanvas Niche SDK, please follow our [Contribution Guidelines](). TBD

## Contact and Support

If you have any questions, feedback, or issues, feel free to reach out to our team at the TBD

Happy coding with Kanvas!
