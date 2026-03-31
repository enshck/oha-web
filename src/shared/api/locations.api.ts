import { useQuery } from "@/shared/api";
import type { IGetCitiesElement, IGetCitiesQuery } from "@/shared/api/dto";
import type { QueryOptions } from "@/shared/interfaces/Api.interface";

import sharedApi from "./api";

export enum SharedQuery {
  getCities = "getCities",
  getCountries = "getCountries",
  getContinents = "getContinents",
}

export const useGetCities = (
  { continent, country, search }: IGetCitiesQuery,
  options?: QueryOptions<IGetCitiesElement[]>,
) =>
  useQuery({
    queryKey: [SharedQuery.getCities, [continent, country, search].join("-")],
    queryFn: () => sharedApi.getCities({ continent, country, search }),
    ...options,
  });

export const useGetCountries = (options?: QueryOptions<string[], [SharedQuery]>) =>
  useQuery({
    queryKey: [SharedQuery.getCountries],
    queryFn: () => sharedApi.getCountries(),
    toggleGlobalLoader: false,
    placeholderData: [],
    ...options,
  });

export const useGetContinents = (options?: QueryOptions<string[], [SharedQuery]>) =>
  useQuery({
    queryKey: [SharedQuery.getContinents],
    queryFn: () => sharedApi.getContinents(),
    toggleGlobalLoader: false,
    placeholderData: [],
    ...options,
  });
