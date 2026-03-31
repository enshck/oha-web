import type { IConfiguration, IConfigurationObject } from "@/shared/interfaces/Configuration.interface";

const REACT_APP_ENV = import.meta.env.VITE_APP_ENV || "dev";

const dev: IConfiguration = {
  env: REACT_APP_ENV,
  baseApiUrl: "http://localhost:3000",
};

const qa: IConfiguration = {
  ...dev,
};

const uat: IConfiguration = {
  ...dev,
};

const prod: IConfiguration = {
  ...dev,
};

const config: IConfigurationObject = {
  dev,
  qa,
  uat,
  prod,
};

const configElement: IConfiguration = config[REACT_APP_ENV];
export default configElement;
