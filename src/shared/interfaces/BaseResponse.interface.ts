export interface IBaseResponse {
  message: string;
}

export interface IPaginatedResponse<T> {
  rows: T[];
  count: number;
}

export interface IErrorResponse {
  code?: number;
  message?: string;
  customMessage?: boolean;
  meta?: Record<string, string>;
}

export interface IDeleteResponse {
  id: string;
}

export interface IDeleteRequestDto {
  id: string;
}

export interface IFilter {
  page: number;
  limit: number;
  search?: string;
}
