export interface IConfiguration {
  env: string;
  baseApiUrl: string;
}

export interface IConfigurationObject {
  [key: string]: IConfiguration;
}
