// src/libs/fetcher.ts
/**
 * Custom error thrown by fetcher when HTTP response is not ok.
 */
export class FetcherError extends Error {
  public statusCode: number;
  public response: Response;
  public body: any;

  constructor(
    message: string,
    statusCode: number,
    response: Response,
    body?: any
  ) {
    super(message);
    this.name = "FetcherError";
    this.statusCode = statusCode;
    this.response = response;
    this.body = body;
  }
}

/**
 * Generic fetch helper supporting JSON and FormData bodies.
 * Throws FetcherError on non-2xx status codes, including parsed error body when available.
 * @param input Request URL or Request object
 * @param init Fetch options
 * @returns Parsed response as T
 */
export default async function fetcher<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  // Clone and normalize headers
  const headers = new Headers(init?.headers ?? {});

  // If sending JSON body, ensure content-type header
  const hasBody = init?.body != null;
  const isFormData = init?.body instanceof FormData;
  if (hasBody && !isFormData && !(init?.body instanceof URLSearchParams)) {
    headers.set("content-type", "application/json");
  }

  const config: RequestInit = { ...init, headers };

  try {
    const response = await fetch(input, config);
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    // Read raw text for parsing or error body
    const raw = await response.text();
    let parsed: any;
    if (isJson) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }
    } else {
      parsed = raw;
    }

    if (!response.ok) {
      const message =
        isJson && parsed?.message ? parsed.message : response.statusText;
      throw new FetcherError(message, response.status, response, parsed);
    }

    return parsed as T;
  } catch (err: any) {
    if (err instanceof FetcherError) {
      throw err;
    } else if (err instanceof Error) {
      throw new FetcherError(err.message, 0, new Response(), null);
    } else {
      throw new FetcherError("Unexpected fetch error", 0, new Response(), null);
    }
  }
}
