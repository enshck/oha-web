import { useEffect } from "react";

import { toaster, TOASTER_TYPE } from "@/shared/components/Snippets/ui";
import { prepareErrorResponsePayload } from "@/shared/utils";

const useToggleErrorToast = (enableErrorHandling: boolean, error: Error | null) => {
  useEffect(() => {
    if (enableErrorHandling && error) {
      const { message } = prepareErrorResponsePayload(error);

      toaster.create({
        title: "Error",
        description: message,
        duration: 5000,
        closable: true,
        type: TOASTER_TYPE.ERROR,
      });
    }
  }, [enableErrorHandling, error]);
};

export default useToggleErrorToast;
