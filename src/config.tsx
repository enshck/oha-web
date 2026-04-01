import type { IConfiguration, IConfigurationObject } from "@/shared/interfaces/Configuration.interface";

const REACT_APP_ENV = import.meta.env.VITE_APP_ENV || "dev";

const dev: IConfiguration = {
  env: REACT_APP_ENV,
  baseApiUrl: "http://localhost:4000/api/v1",
  s3SharedCities: import.meta.env.VITE_S3_SHARED_CITIES,
};

const config: IConfigurationObject = {
  dev,
};

const configElement: IConfiguration = config[REACT_APP_ENV];
export default configElement;
