import config from "@/config";

export default {
  PROCESS: {
    CREATE_PROCESS: `${config.baseApiUrl}/process`,
    GET_PROCESS_STATUS: `${config.baseApiUrl}/process`,
  },
};
