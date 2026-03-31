import { useContext } from "react";

import { ModalContext } from "../ModalProvider";

const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Initialization of the modal context is required");
  }

  return {
    ...modalContext,
  };
};

export default useModalContext;
