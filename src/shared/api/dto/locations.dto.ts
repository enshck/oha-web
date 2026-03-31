export interface IGetCitiesQuery {
  search?: string;
  country?: string;
  continent?: string;
}

export interface IGetCitiesElement {
  id: string;
  name: string;
  name_native: string;
  country: string;
  continent: string;
  latitude: string;
  longitude: string;
  population: string;
  founded: string;
  landmarks: string[];
  description: string;
}
