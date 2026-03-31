import { API } from "@/shared/api/constants/";
import type { ICreateProcessRequest, ICreateProcessResponse, IGetProccessStatus } from "@/shared/api/dto";
import { METHODS } from "@/shared/constants";
import { request } from "@/shared/utils";

export default {
  createProcess: ({ payload }: ICreateProcessRequest): Promise<ICreateProcessResponse> =>
    request(
      METHODS.POST,
      API.PROCESS.CREATE_PROCESS,
    )({
      payload,
    }),

  fetchProcessResult: (process_id: string): Promise<IGetProccessStatus> =>
    request(METHODS.GET, `${API.PROCESS.GET_PROCESS_STATUS}/${process_id}`)(),
};
