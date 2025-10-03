import { HeaderConstructor } from "@/types/app";

export const getHeadersFromBuilder = async (
  headers: HeaderConstructor,
): Promise<Record<string, string>> =>
  Object.fromEntries(
    await Promise.all(
      Object.entries(headers).map(async ([key, fn]) => [key, await fn()]),
    ),
  );
