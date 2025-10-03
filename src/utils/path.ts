/**
 * Universal path/URL join utility
 * Works with URLs and file paths across web, React Native, and Node.js
 */

// Platform detection
// const isNode = typeof process !== "undefined" &&
//     process.versions != null &&
//     process.versions.node != null;

// console.log({ isNode });

const isReactNative = typeof navigator !== "undefined" &&
    navigator.product === "ReactNative";

/**
 * Checks if a string is a URL (has protocol)
 */
function isUrl(str: string): boolean {
    return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(str);
}

/**
 * Normalize path separators and remove duplicate slashes
 */
function normalizePath(path: string): string {
    // Replace backslashes with forward slashes
    let normalized = path.replace(/\\/g, "/");

    // Remove duplicate slashes (but preserve :// in URLs)
    normalized = normalized.replace(/([^:]\/)\/+/g, "$1");

    return normalized;
}

/**
 * Join URL segments properly
 */
function joinUrlSegments(base: string, ...segments: string[]): string {
    // Parse the base URL
    let url: URL;

    try {
        url = new URL(base);
    } catch (e) {
        throw new Error(`Invalid URL: ${base}`);
    }

    // Join all segments
    const allSegments = [url.pathname, ...segments];

    // Filter out empty segments and normalize
    const cleanSegments = allSegments
        .filter((segment) => segment && segment !== "/")
        .map((segment) => segment.replace(/^\/+|\/+$/g, "")); // Remove leading/trailing slashes

    // Build the final pathname
    const pathname = "/" + cleanSegments.join("/");

    // Update URL pathname
    url.pathname = pathname;

    return url.toString();
}

/**
 * Join file path segments
 */
function joinFilePaths(...segments: string[]): string {
    // if (isNode) {
    //     // Use Node.js path module
    //     const path = require("path");
    //     return path.join(...segments);
    // }

    // For web and React Native, use manual joining
    const cleanSegments = segments
        .filter((segment) => segment !== "")
        .map((segment, index) => {
            // Normalize
            let clean = normalizePath(segment);

            // Remove leading slash except for the first segment
            if (index > 0) {
                clean = clean.replace(/^\/+/, "");
            }

            // Remove trailing slash except for the last segment if it had one
            if (index < segments.length - 1) {
                clean = clean.replace(/\/+$/, "");
            }

            return clean;
        })
        .filter((segment) => segment !== "");

    return cleanSegments.join("/");
}

/**
 * Universal path join function
 * Automatically detects URLs vs file paths and joins accordingly
 *
 * @example
 * // URLs
 * pathJoin('https://api.example.com', 'users', '123')
 * // => 'https://api.example.com/users/123'
 *
 * pathJoin('https://api.example.com/', '/users/', '/123/')
 * // => 'https://api.example.com/users/123/'
 *
 * pathJoin('https://api.example.com/v1', '../v2', 'users')
 * // => 'https://api.example.com/v2/users'
 *
 * // File paths
 * pathJoin('/home', 'user', 'documents')
 * // => '/home/user/documents'
 *
 * pathJoin('C:\\Users', 'Documents', 'file.txt')
 * // => 'C:/Users/Documents/file.txt' (or Windows path in Node.js)
 */
export function pathJoin(...segments: string[]): string {
    if (segments.length === 0) {
        return "";
    }

    // Filter out empty segments
    const filtered = segments.filter((s) => s != null && s !== "");

    if (filtered.length === 0) {
        return "";
    }

    const firstSegment = filtered[0];

    // Check if it's a URL
    if (isUrl(firstSegment)) {
        return joinUrlSegments(firstSegment, ...filtered.slice(1));
    }

    // Otherwise treat as file path
    return joinFilePaths(...filtered);
}

/**
 * Join URL segments (always treats as URL, throws if invalid)
 * Useful when you know you're working with URLs
 *
 * @example
 * urlJoin('https://api.example.com', 'users', '123')
 * // => 'https://api.example.com/users/123'
 */
export function urlJoin(base: string, ...segments: string[]): string {
    if (!isUrl(base)) {
        throw new Error(`Base must be a valid URL with protocol: ${base}`);
    }
    return joinUrlSegments(base, ...segments);
}

/**
 * Build a URL with query parameters
 *
 * @example
 * buildUrl('https://api.example.com/users', { page: 1, limit: 10 })
 * // => 'https://api.example.com/users?page=1&limit=10'
 */
export function buildUrl(
    base: string,
    params?: Record<string, string | number | boolean | null | undefined>,
): string {
    const url = new URL(base);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value != null) {
                url.searchParams.set(key, String(value));
            }
        });
    }

    return url.toString();
}

/**
 * Join path segments and add query parameters
 *
 * @example
 * pathJoinWithParams('https://api.example.com', 'users', '123', { format: 'json' })
 * // => 'https://api.example.com/users/123?format=json'
 */
export function pathJoinWithParams(
    base: string,
    ...args: Array<string | Record<string, any>>
): string {
    // Separate path segments from params object
    const params = args.find((arg) =>
        typeof arg === "object" && !Array.isArray(arg)
    ) as Record<string, any> | undefined;
    const segments = args.filter((arg) => typeof arg === "string") as string[];

    // Join the path
    const joinedPath = pathJoin(base, ...segments);

    // Add params if provided
    if (params && isUrl(joinedPath)) {
        return buildUrl(joinedPath, params);
    }

    return joinedPath;
}
