import { API } from "@/shared/api/constants/";
import type { IGetCitiesElement, IGetCitiesQuery } from "@/shared/api/dto";
import { METHODS } from "@/shared/constants";
import { request } from "@/shared/utils";

export default {
  getCities: (query: IGetCitiesQuery): Promise<IGetCitiesElement[]> =>
    request(METHODS.GET, `${API.LOCATIONS.GET_CITIES}`)(query),
  getCountries: (): Promise<string[]> => request(METHODS.GET, `${API.LOCATIONS.GET_COUNTRIES}`)(),
  getContinents: (): Promise<string[]> => request(METHODS.GET, `${API.LOCATIONS.GET_CONTINENTS}`)(),
};
