import { useEffect } from "react";

import { useLoaderContext } from "@/shared/providers";

const useToggleLoader = (toggleGlobalLoader: boolean, isLoading: boolean) => {
  const { onShowLoader, onHideLoader } = useLoaderContext();

  useEffect(() => {
    if (toggleGlobalLoader) {
      if (isLoading) {
        onShowLoader();
      } else {
        onHideLoader();
      }
    }
  }, [toggleGlobalLoader, isLoading, onShowLoader, onHideLoader]);
};

export default useToggleLoader;
