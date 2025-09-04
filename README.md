# Kanvas Core JS SDK

A modern TypeScript SDK for seamless integration with the Kanvas Niche ecosystem.

## Installation

```bash
npm install @kanvas/core
```

## Quick Start

```typescript
import { createClient } from "@kanvas/core/app";
import { createAuth } from "@kanvas/core/auth";

// Initialize client
const client = createClient({
  appKey: "YOUR_KANVAS_API_KEY",
  baseUrl: "https://api.kanvas.com",
});

// Create auth instance
const auth = createAuth(client);

// Login
const session = await auth.login({
  email: "user@example.com",
  password: "password",
});
```

## Available Modules

The SDK is organized into modular packages for better tree-shaking:

- `@kanvas/core/app` - Client initialization
- `@kanvas/core/auth` - Authentication
- `@kanvas/core/settings` - Settings management
- `@kanvas/core/file-system` - File operations
- `@kanvas/core/receiver` - Receiver data submission
- `@kanvas/core/commerce` - E-commerce (cart & orders)
- `@kanvas/core/locations` - Geographic data

## Client Configuration

### Basic Client (Browser/Client-side)

```typescript
import { createClient } from "@kanvas/core/app";

const client = createClient({
  appKey: "YOUR_KANVAS_API_KEY",
  baseUrl: "https://api.kanvas.com",
  headers: {
    Authorization: () => localStorage.getItem("token") || "",
  },
});
```

### Admin Client (Server-side only)

```typescript
import { createAdminClient } from "@kanvas/core/app";

const adminClient = createAdminClient({
  appKey: process.env.KANVAS_API_KEY,
  adminKey: process.env.KANVAS_ADMIN_KEY, // Required for admin operations
  baseUrl: process.env.KANVAS_URL,
  ssrMode: true, // Enable for SSR
});
```

**⚠️ Security Note:** Never use `createAdminClient` in browser environments. The admin key should only exist on your server.

## Using with Next.js

### App Router (Server Components)

```typescript
// app/lib/kanvas.ts
import { createAdminClient } from "@kanvas/core/app";
import { createSettings } from "@kanvas/core/settings";

export function getKanvasClient() {
  const client = createAdminClient({
    appKey: process.env.KANVAS_API_KEY!,
    adminKey: process.env.KANVAS_ADMIN_KEY!,
    baseUrl: process.env.KANVAS_URL!,
    ssrMode: true,
  });

  return {
    client,
    settings: createSettings(client),
  };
}

// app/page.tsx
import { getKanvasClient } from "@/lib/kanvas";

export default async function Page() {
  const { settings } = getKanvasClient();
  const appSettings = await settings.appSettings();

  return <div>{/* Your content */}</div>;
}
```

### Pages Router (API Routes)

```typescript
// pages/api/settings.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createAdminClient } from "@kanvas/core/app";
import { createSettings } from "@kanvas/core/settings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createAdminClient({
    appKey: process.env.KANVAS_API_KEY!,
    adminKey: process.env.KANVAS_ADMIN_KEY!,
    baseUrl: process.env.KANVAS_URL!,
  });

  const settings = createSettings(client);
  const data = await settings.appSettings();

  res.json(data);
}
```

## Module Usage Examples

### Authentication

```typescript
import { createAuth } from "@kanvas/core/auth";

const auth = createAuth(client);

// Login
const session = await auth.login({
  email: "user@example.com",
  password: "password",
});

// Refresh token
const newToken = await auth.refreshToken(session.refresh_token);

// Social login
const socialSession = await auth.socialLogin({
  token: "oauth_token",
  provider: "google",
});
```

### File System

```typescript
import { createFileSystem } from "@kanvas/core/file-system";

const fs = createFileSystem(client);

// Upload file
const file = new File(["content"], "document.pdf");
const uploaded = await fs.uploadFile(file);

// Update profile photo
await fs.updateUserPhotoProfile(file, userId);
```

### Commerce

```typescript
import { createCart, createOrder } from "@kanvas/core/commerce";

const cart = createCart(client);
const order = createOrder(client);

// Add to cart
await cart.addToCart([{ variant_id: "123", quantity: 2 }]);

// Create order
const result = await order.createOrderFromCart({
  cartId: "default",
  customer: {
    email: "customer@example.com",
    phone: "+1234567890",
  },
});
```

### Locations

```typescript
import { createLocations } from "@kanvas/core/locations";

const locations = createLocations(client);

// Get countries
const countries = await locations.getAllCountries({ first: 10 });

// Get states by country
const states = await locations.getStatesByCountry(countryId);
```

## Creating Custom Modules

You can extend the SDK with custom modules:

```typescript
// custom-leads.ts
import { Client } from '@kanvas/core/app';
import { gql } from '@apollo/client';

class Leads {
  #client: Client;

  constructor(client: Client) {
    this.#client = client;
  }

  async createLead(input: LeadInput) {
    const CREATE_LEAD = gql`
      mutation CreateLead($input: LeadInput!) {
        createLead(input: $input) {
          id
          uuid
          title
        }
      }
    `;

    const response = await this.#client.mutate({
      mutation: CREATE_LEAD,
      variables: { input }
    });

    return response.data.createLead;
  }

  async getLeads(options = {}) {
    const GET_LEADS = gql`
      query GetLeads($first: Int, $page: Int) {
        leads(first: $first, page: $page) {
          data {
            id
            uuid
            title
          }
        }
      }
    `;

    const response = await this.#client.query({
      query: GET_LEADS,
      variables: options,
      fetchPolicy: 'no-cache'
    });

    return response.data.leads;
  }
}

export function createLeads(client: Client) {
  return new Leads(client);
}

// Usage
const leads = createLeads(client);
const newLead = await leads.createLead({ title: 'New Lead' });
```

## Migration from Legacy Version

### Key Changes

1. **Modular imports** - Import only what you need
2. **TypeScript support** - Full type safety
3. **Separate client types** - Distinct client and admin clients
4. **Modern patterns** - Async/await, better error handling

### Migration Examples

#### Before (Legacy)

```typescript
import KanvasCore from "@kanvas/core";

const kanvas = new KanvasCore({
  url: "YOUR_KANVAS_URL",
  key: "YOUR_KANVAS_API_KEY",
  middlewares: [genericAuthMiddleware(getAuthToken)],
  adminKey: "OPTIONAL_ADMIN_KEY",
});

// All modules attached to main instance
const session = await kanvas.auth.login("email", "password");
const settings = await kanvas.settings.getAppSettings();
```

#### After (New)

```typescript
import { createClient } from "@kanvas/core/app";
import { createAuth } from "@kanvas/core/auth";
import { createSettings } from "@kanvas/core/settings";

const client = createClient({
  appKey: "YOUR_KANVAS_API_KEY",
  baseUrl: "YOUR_KANVAS_URL",
  headers: {
    Authorization: () => getAuthToken(),
  },
});

// Create only the modules you need
const auth = createAuth(client);
const settings = createSettings(client);

const session = await auth.login({
  email: "email",
  password: "password",
});
const appSettings = await settings.appSettings();
```

### Module Mapping

| Legacy                               | New                               |
| ------------------------------------ | --------------------------------- |
| `kanvas.auth.login(email, password)` | `auth.login({ email, password })` |
| `kanvas.users.*`                     | Not yet implemented - use legacy  |
| `kanvas.filesystem.*`                | `createFileSystem(client)`        |
| `kanvas.settings.*`                  | `createSettings(client)`          |
| `kanvas.locations.*`                 | `createLocations(client)`         |
| `kanvas.cart.*`                      | `createCart(client)`              |
| `kanvas.order.*`                     | `createOrder(client)`             |
| `kanvas.receiver.*`                  | `createReceiver(client)`          |

### Gradual Migration

You can use both versions during migration:

```typescript
// Use new modules where available
import { createClient } from "@kanvas/core/app";
import { createAuth } from "@kanvas/core/auth";

// Keep using legacy for unsupported modules
import KanvasCore from "@kanvas/core";

const client = createClient({
  /* ... */
});
const auth = createAuth(client);

const legacyKanvas = new KanvasCore({
  /* ... */
});
const users = legacyKanvas.users; // Still using legacy
```

## Environment Variables

```env
KANVAS_URL=https://api.kanvas.com
KANVAS_API_KEY=your_api_key
KANVAS_ADMIN_KEY=your_admin_key  # Server-side only
```

## TypeScript Support

The SDK is fully typed. Import types as needed:

```typescript
import type {
  Client,
  AuthLoginResponse,
  CartItem,
  Order
} from '@kanvas/core/types';
```

## Error Handling

```typescript
try {
  const session = await auth.login({ email, password });
} catch (error) {
  if (error.graphQLErrors) {
    // Handle GraphQL errors
    console.error("GraphQL error:", error.graphQLErrors);
  } else if (error.networkError) {
    // Handle network errors
    console.error("Network error:", error.networkError);
  }
}
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/kanvas/core-js) or contact support.
