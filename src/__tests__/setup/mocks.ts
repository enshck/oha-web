import type { IGetCitiesElement } from "@/shared/api/dto";

export const mockCities: IGetCitiesElement[] = [
  {
    id: "1",
    name: "New York",
    name_native: "New York",
    country: "United States",
    continent: "North America",
    population: "8335897",
    founded: "1624",
    latitude: "40.7128",
    longitude: "-74.0060",
    landmarks: ["Statue of Liberty", "Empire State Building"],
    description: "The largest city in the United States",
  },
  {
    id: "2",
    name: "London",
    name_native: "London",
    country: "United Kingdom",
    continent: "Europe",
    population: "8982000",
    founded: "47",
    latitude: "51.5074",
    longitude: "-0.1278",
    landmarks: ["Big Ben", "Tower Bridge"],
    description: "The capital and largest city of England",
  },
  {
    id: "3",
    name: "Tokyo",
    name_native: "東京",
    country: "Japan",
    continent: "Asia",
    population: "13960000",
    founded: "1457",
    latitude: "35.6762",
    longitude: "139.6503",
    landmarks: ["Senso-ji Temple", "Tokyo Tower"],
    description: "The capital and largest city of Japan",
  },
];

export const mockCountries = ["United States", "United Kingdom", "Japan"];

export const mockContinents = ["North America", "Europe", "Asia"];
