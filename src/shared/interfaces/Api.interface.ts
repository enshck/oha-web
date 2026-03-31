import type { QueryKey, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type { IErrorResponse } from "./BaseResponse.interface";

interface IExtendedOptions {
  toggleGlobalLoader?: boolean;
  enableErrorHandling?: boolean;
}

export type IQueryOptions<TQueryFnData, TData, TQueryKey extends QueryKey = string[]> = UseQueryOptions<
  TQueryFnData,
  AxiosError<IErrorResponse>,
  TData,
  TQueryKey
> &
  IExtendedOptions;

export type QueryOptions<TQueryFnData, TQueryKey extends QueryKey = string[], TData = TQueryFnData> = Omit<
  IQueryOptions<TQueryFnData, TData, TQueryKey>,
  "queryKey" | "queryFn" | "initialData"
>;

export type MutationOptions<TData, TParams> = UseMutationOptions<TData, AxiosError<IErrorResponse>, TParams> &
  IExtendedOptions;
