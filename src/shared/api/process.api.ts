import { useQuery, useMutation } from "@/shared/api";
import type { ICreateProcessRequest, ICreateProcessResponse, IGetProccessStatus } from "@/shared/api/dto";
import type { QueryOptions, MutationOptions } from "@/shared/interfaces/Api.interface";

import sharedApi from "./api";

export enum SharedQuery {
  getCurrentWeather = "getCurrentWeather",
}

export const useCreateProcess = (options?: MutationOptions<ICreateProcessResponse, ICreateProcessRequest>) => {
  return useMutation({
    mutationKey: [SharedQuery.getCurrentWeather],
    toggleGlobalLoader: false,
    mutationFn: (params: ICreateProcessRequest) => sharedApi.createProcess(params),
    retry: false,
    ...options,
  });
};

export const useFetchProcessResult = (
  process_id: string,
  options?: QueryOptions<IGetProccessStatus, [SharedQuery, string]>,
) =>
  useQuery({
    queryKey: [SharedQuery.getCurrentWeather, process_id],
    queryFn: () => sharedApi.fetchProcessResult(process_id),
    toggleGlobalLoader: false,
    ...options,
  });
