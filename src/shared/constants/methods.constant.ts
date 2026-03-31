export const METHODS = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  PUT: "put",
  DELETE: "delete",
};

export type HttpMethod = (typeof METHODS)[keyof typeof METHODS];
