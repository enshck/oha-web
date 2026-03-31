export interface IConfiguration {
  env: string;
  baseApiUrl: string;
  s3SharedCities: string;
}

export interface IConfigurationObject {
  [key: string]: IConfiguration;
}
