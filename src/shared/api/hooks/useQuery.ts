import { type QueryKey, useQuery as useTanstackQuery } from "@tanstack/react-query";

import type { IQueryOptions } from "@/shared/interfaces/Api.interface";

import useToggleErrorToast from "./useToggleErrorToast";
import useToggleLoader from "./useToggleLoader";

const useQuery = <TQueryFnData, TData, TQueryKey extends QueryKey = string[]>(
  options: IQueryOptions<TQueryFnData, TData, TQueryKey>,
) => {
  const { enableErrorHandling = true, toggleGlobalLoader = true, ...baseOptions } = options;

  const query = useTanstackQuery(baseOptions);

  useToggleLoader(toggleGlobalLoader, query.isLoading);
  useToggleErrorToast(enableErrorHandling, query.error);

  return query;
};

export default useQuery;
