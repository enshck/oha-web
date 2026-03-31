export interface IRecursive<T> {
  [key: string]: T | IRecursive<T>;
}

export interface ITokenSchema<T = string | number> {
  value: T;
  description?: string;
}
