import axios from "axios";
import type { AxiosError } from "axios";

// Import type definitions
import "@/definitions/axios.d.ts";

import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "../constants";
import type { HttpMethod } from "../constants";

const axiosInstance = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});

/**
 * Creates a convenient wrapper around axios for making HTTP requests.
 *
 * @param {HttpMethod} method - The HTTP method to use (e.g., "get", "post", "put", "delete").
 * @param {string} url - The URL endpoint to send the request to.
 * @returns {(payload?: unknown) => Promise} A function that accepts an optional payload:
 *   - For GET requests, the payload will be sent as query parameters.
 *   - For other methods, the payload will be sent as the request body.
 *   The returned promise resolves with the response data.
 */
export function request(method: HttpMethod, url: string, headers?: Record<string, string>) {
  return (payload?: unknown) => {
    return axiosInstance
      .request({
        method,
        url,
        headers,
        ...(method.toLowerCase() === "get" ? { params: payload } : { data: payload }),
      })
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  };
}
