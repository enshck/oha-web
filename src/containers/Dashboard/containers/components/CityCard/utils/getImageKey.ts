import type { IGetCitiesElement } from "@/shared/api/dto";

const normalizeImageKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getCityImage = (city: IGetCitiesElement) => {
  const imageKey = `${normalizeImageKey(city.name)}-${normalizeImageKey(city.country)}`;

  return `/cities/${imageKey}.png`;
};
