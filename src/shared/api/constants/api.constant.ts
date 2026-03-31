import config from "@/config";

export default {
  LOCATIONS: {
    GET_CITIES: `${config.baseApiUrl}/locations/cities`,
    GET_COUNTRIES: `${config.baseApiUrl}/locations/countries`,
    GET_CONTINENTS: `${config.baseApiUrl}/locations/continents`,
  },
};
