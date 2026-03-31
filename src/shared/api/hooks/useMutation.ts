import { useMutation as useTanstackMutation } from "@tanstack/react-query";

import type { MutationOptions } from "@/shared/interfaces/Api.interface";

import useToggleErrorToast from "./useToggleErrorToast";
import useToggleLoader from "./useToggleLoader";

const useMutation = <TData, TParams>(options: MutationOptions<TData, TParams>) => {
  const { enableErrorHandling = true, toggleGlobalLoader = true, ...baseOptions } = options;

  const mutation = useTanstackMutation(baseOptions);

  useToggleErrorToast(enableErrorHandling, mutation.error);
  useToggleLoader(toggleGlobalLoader, mutation.isPending);

  return mutation;
};

export default useMutation;
