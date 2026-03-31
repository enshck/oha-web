import { useContext } from "react";

import { LoaderContext } from "../LoaderProvider";

const useLoaderContext = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoaderContext must be used within a LoaderProvider");
  }

  return context;
};

export default useLoaderContext;
