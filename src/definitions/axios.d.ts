// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }

  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
