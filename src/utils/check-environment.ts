interface EnvironmentInfo {
  runtime: "browser" | "node" | "deno" | "bun" | "react-native" | "unknown";
  isBrowser: boolean;
  isNode: boolean;
  isDeno: boolean;
  isBun: boolean;
  isReactNative: boolean;
  isServer: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  details: {
    userAgent?: string;
    version?: string;
    platform?: string;
  };
}

function detectEnvironment(): EnvironmentInfo {
  const globalThis = (() => {
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    throw new Error("Unable to locate global object");
  })();

  const info: EnvironmentInfo = {
    runtime: "unknown",
    isBrowser: false,
    isNode: false,
    isDeno: false,
    isBun: false,
    isReactNative: false,
    isServer: false,
    isMobile: false,
    isDesktop: false,
    details: {},
  };

  // Check for React Native
  if (
    typeof navigator !== "undefined" &&
    navigator.product === "ReactNative"
  ) {
    info.runtime = "react-native";
    info.isReactNative = true;
    info.isMobile = true;
    info.details.platform = "react-native";
    return info;
  }

  // Check for Deno
  if (
    typeof (globalThis as any).Deno !== "undefined" &&
    typeof (globalThis as any).Deno.version !== "undefined"
  ) {
    info.runtime = "deno";
    info.isDeno = true;
    info.isServer = true;
    info.details.version = (globalThis as any).Deno.version.deno;
    info.details.platform = "deno";
    return info;
  }

  // Check for Bun
  if (typeof (globalThis as any).Bun !== "undefined") {
    info.runtime = "bun";
    info.isBun = true;
    info.isServer = true;
    info.details.version = (globalThis as any).Bun.version;
    info.details.platform = "bun";
    return info;
  }

  // Check for Node.js
  if (
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node
  ) {
    info.runtime = "node";
    info.isNode = true;
    info.isServer = true;
    info.details.version = process.versions.node;
    info.details.platform = process.platform;
    return info;
  }

  // Check for Browser
  if (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof navigator !== "undefined"
  ) {
    info.runtime = "browser";
    info.isBrowser = true;
    info.details.userAgent = navigator.userAgent;
    info.details.platform = navigator.platform;

    // Detect mobile vs desktop
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(
          navigator.userAgent,
        );

    // Additional mobile detection
    const isMobileDevice = ("ontouchstart" in window) ||
      (navigator.maxTouchPoints > 0) ||
      ((navigator as any).msMaxTouchPoints > 0);

    info.isMobile = isMobile || isMobileDevice;
    info.isDesktop = !info.isMobile;

    return info;
  }

  // Unknown environment
  return info;
}

// Helper functions for common checks
export const isNode = (): boolean => detectEnvironment().isNode;
export const isBrowser = (): boolean => detectEnvironment().isBrowser;
export const isDeno = (): boolean => detectEnvironment().isDeno;
export const isBun = (): boolean => detectEnvironment().isBun;
export const isReactNative = (): boolean => detectEnvironment().isReactNative;
export const isServer = (): boolean => detectEnvironment().isServer;
export const isMobile = (): boolean => detectEnvironment().isMobile;
export const isDesktop = (): boolean => detectEnvironment().isDesktop;
