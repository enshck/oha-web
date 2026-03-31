import type { AxiosError } from "axios";

import type { IErrorResponse } from "../interfaces";

export function prepareErrorResponsePayload(error: Error | IErrorResponse): IErrorResponse {
  const DEFAULT_ERROR_MESSAGE = "Something went wrong. Try Again";
  const axiosError = error as AxiosError<IErrorResponse>;
  const backendError = axiosError.response?.data;

  const errorToProcess = backendError || error;

  return {
    ...errorToProcess,
    message: (errorToProcess as IErrorResponse).customMessage
      ? (errorToProcess as IErrorResponse).message
      : DEFAULT_ERROR_MESSAGE,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(func: T, waitFor = 500) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};
