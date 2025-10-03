/**
 * Tests and usage examples for pathJoin utility
 */

import { buildUrl, pathJoin, pathJoinWithParams, urlJoin } from "./path";

// ============================================
// URL JOINING TESTS
// ============================================

console.log("=== URL Joining Tests ===\n");

// Basic URL joining
console.log(pathJoin("https://api.example.com", "users", "123"));
// => 'https://api.example.com/users/123'

console.log(pathJoin("https://api.example.com/", "/users/", "/123/"));
// => 'https://api.example.com/users/123/'

// Handling trailing slashes
console.log(pathJoin("https://api.example.com/api/v1", "users"));
// => 'https://api.example.com/api/v1/users'

// With query strings preserved
console.log(pathJoin("https://api.example.com?key=value", "users"));
// => 'https://api.example.com/users?key=value'

// Complex paths
console.log(
    pathJoin("https://api.example.com/api", "v1", "users", "123", "posts"),
);
// => 'https://api.example.com/api/v1/users/123/posts'

// Different protocols
console.log(pathJoin("http://localhost:3000", "api", "users"));
// => 'http://localhost:3000/api/users'

console.log(pathJoin("ws://example.com", "socket", "connect"));
// => 'ws://example.com/socket/connect'

// With ports
console.log(pathJoin("https://api.example.com:8080", "users", "123"));
// => 'https://api.example.com:8080/users/123'

// ============================================
// FILE PATH JOINING TESTS
// ============================================

console.log("\n=== File Path Joining Tests ===\n");

// Unix-style paths
console.log(pathJoin("/home", "user", "documents", "file.txt"));
// => '/home/user/documents/file.txt'

console.log(pathJoin("/var/www", "html", "index.html"));
// => '/var/www/html/index.html'

// Windows-style paths (normalized to forward slashes in browser/RN)
console.log(pathJoin("C:\\Users", "Documents", "file.txt"));
// => 'C:/Users/Documents/file.txt' (or 'C:\\Users\\Documents\\file.txt' in Node.js)

// Relative paths
console.log(pathJoin("src", "components", "Button.tsx"));
// => 'src/components/Button.tsx'

console.log(pathJoin("./config", "database.json"));
// => './config/database.json'

// Handling empty segments
console.log(pathJoin("/home", "", "user", null as any, "docs"));
// => '/home/user/docs'

// ============================================
// URL-SPECIFIC FUNCTION
// ============================================

console.log("\n=== urlJoin (Strict URL) ===\n");

console.log(urlJoin("https://api.example.com", "users", "123"));
// => 'https://api.example.com/users/123'

try {
    urlJoin("/home/user", "documents"); // This will throw
} catch (e) {
    console.log("Error:", (e as Error).message);
    // => 'Base must be a valid URL with protocol: /home/user'
}

// ============================================
// BUILD URL WITH QUERY PARAMS
// ============================================

console.log("\n=== buildUrl with Query Params ===\n");

console.log(buildUrl("https://api.example.com/users", {
    page: 1,
    limit: 10,
    sort: "name",
}));
// => 'https://api.example.com/users?page=1&limit=10&sort=name'

console.log(buildUrl("https://api.example.com/search", {
    q: "hello world",
    filter: "active",
    debug: true,
}));
// => 'https://api.example.com/search?q=hello+world&filter=active&debug=true'

// Null/undefined values are skipped
console.log(buildUrl("https://api.example.com/users", {
    page: 1,
    limit: null,
    filter: undefined,
}));
// => 'https://api.example.com/users?page=1'

// ============================================
// PATH JOIN WITH PARAMS
// ============================================

console.log("\n=== pathJoinWithParams ===\n");

console.log(pathJoinWithParams(
    "https://api.example.com",
    "users",
    "123",
    { format: "json", include: "posts" },
));
// => 'https://api.example.com/users/123?format=json&include=posts'

console.log(pathJoinWithParams(
    "https://api.example.com/api/v1",
    "search",
    { q: "test", page: 1 },
));
// => 'https://api.example.com/api/v1/search?q=test&page=1'

// ============================================
// REAL-WORLD USE CASES
// ============================================

console.log("\n=== Real-World Examples ===\n");

// API client base URL
const API_BASE = "https://api.example.com/v1";

console.log("Get user:", pathJoin(API_BASE, "users", "123"));
// => 'https://api.example.com/v1/users/123'

console.log("Get posts:", pathJoin(API_BASE, "users", "123", "posts"));
// => 'https://api.example.com/v1/users/123/posts'

console.log("Search:", pathJoinWithParams(API_BASE, "search", { q: "test" }));
// => 'https://api.example.com/v1/search?q=test'

// GraphQL endpoint (your use case!)
const GRAPHQL_BASE = "https://graphapi.kanvas.dev";
console.log("GraphQL:", pathJoin(GRAPHQL_BASE, "graphql"));
// => 'https://graphapi.kanvas.dev/graphql'

// Mobile app - local files
console.log(
    "Cache file:",
    pathJoin("file://", "cache", "images", "avatar.jpg"),
);
// => 'file://cache/images/avatar.jpg'

// React Native asset
console.log("Asset:", pathJoin("asset://", "fonts", "Roboto.ttf"));
// => 'asset://fonts/Roboto.ttf'

// Node.js file operations
console.log("Config:", pathJoin(process.cwd(), "config", "app.json"));
// => '/current/working/directory/config/app.json'

// ============================================
// EDGE CASES
// ============================================

console.log("\n=== Edge Cases ===\n");

// Multiple slashes
console.log(pathJoin("https://api.example.com///", "///users///", "///123///"));
// => 'https://api.example.com/users/123/'

// Empty strings
console.log(pathJoin("https://api.example.com", "", "", "users"));
// => 'https://api.example.com/users'

// Just base URL
console.log(pathJoin("https://api.example.com"));
// => 'https://api.example.com'

// Single segment
console.log(pathJoin("/home"));
// => '/home'

// No segments
console.log(pathJoin());
// => ''

// URL with existing path
console.log(
    pathJoin("https://api.example.com/already/has/path", "more", "segments"),
);
// => 'https://api.example.com/already/has/path/more/segments'

// Preserve hash
console.log(pathJoin("https://example.com#section", "path"));
// => 'https://example.com/path#section'

// ============================================
// TYPESCRIPT USAGE
// ============================================

console.log("\n=== TypeScript Examples ===\n");

// Type-safe API client
class ApiClient {
    constructor(private baseUrl: string) {}

    getEndpoint(path: string, params?: Record<string, any>): string {
        if (params) {
            return pathJoinWithParams(this.baseUrl, path, params);
        }
        return pathJoin(this.baseUrl, path);
    }

    users(id?: string): string {
        return id
            ? pathJoin(this.baseUrl, "users", id)
            : pathJoin(this.baseUrl, "users");
    }
}

const client = new ApiClient("https://api.example.com/v1");
console.log("Users list:", client.users());
// => 'https://api.example.com/v1/users'

console.log("Single user:", client.users("123"));
// => 'https://api.example.com/v1/users/123'

console.log("Search:", client.getEndpoint("search", { q: "test" }));
// => 'https://api.example.com/v1/search?q=test'
