# Kanvas Core JS
## Introduction

Welcome to the documentation for the Kanvas SDK, a TypeScript SDK designed exclusively to seamlessly connect with the Kanvas Niche ecosystem. This SDK is crafted to enhance the development of headless applications by providing easy-to-use interfaces for interacting with various modules within the Kanvas Niche ecosystem.

## Table of Contents

1.  [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Initializate the sdk](#initializate-the-sdk)
2.  [Modules](#modules)
    -   [Ecosystem](#ecosystem)
    -   [Inventory](#inventory)
    -   [Social](#social)
3.  [Usage Examples](#usage-examples)
4.  [API Reference](#api-reference)
5.  [Contribution Guidelines](#contribution-guidelines)
6.  [Contact and Support](#contact-and-support)


## Getting Started

### Installation

To begin using the Kanvas SDK in your project, follow these simple steps:

```bash
npm install @kanvas/core
```

### Initializate the sdk

Before using any module, you need to authenticate your application with the Kanvas Niche ecosystem. Obtain your API keys from the Kanvas Niche dashboard and initialize the SDK with the following code:

```typescript

import KanvasCore, { genericAuthMiddleware } from '@kanvas/core';

// Function to retrieve the authentication token from cookies
const getKey = async (): Promise<string | null> => {
  return localStorage.getItem("token") || null // wherever you have saved the user token
};

// Initialize Kanvas Core
const client= new KanvasCore({
  url: 'kanvas-url',
  key: 'your-kanvas-api-key',
  middlewares: [genericAuthMiddleware(getKey)]
});


```

## Modules

The Kanvas Niche SDK provides specific modules for common problems encountered during headless app development. Here are the key modules:

### Ecosystem

The Ecosystem module handles authentication, teams, and company-related functionalities.

### Inventory

The Inventory module manages products, variants, and distribution channels.

### Social

The Social module deals with follows, comments, reactions, and messaging features.

### CRM

The CRM module covers leads, deals, and pipelines for customer relationship management.


## Usage Examples

Here are some basic examples demonstrating how to use the Kanvas Niche SDK:

### Ecosystem - User Login

```typescript

const user = await client.auth.login(email, password);
console.log(user);
```

### Inventory

```typescript

const products = await client.inventory.getProduct();
console.log(products);
```


### CRM - Leads

```typescript

const leads = await client.lead.getAllLeads();
console.log(leads);
```



## API Reference

For a comprehensive list of available methods and their descriptions, refer to the [API Reference](https://documenter.getpostman.com/view/15472655/2s93CKNtdP). 

## Contribution Guidelines

If you'd like to contribute to the Kanvas Niche SDK, please follow our [Contribution Guidelines](). TBD

## Contact and Support

If you have any questions, feedback, or issues, feel free to reach out to our team at the TBD

Happy coding with Kanvas!