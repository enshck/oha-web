export interface ICreateProcessRequest {
  payload: string;
}

export interface ICreateProcessResponse {
  id: string;
}

type ProcessStatus = "pending" | "completed" | "failed";

export interface IGetProccessStatus {
  status: ProcessStatus;
  hash: string | null;
  error: string | null;
  processingTime: number;
}
