import { Dialog, Portal } from "@chakra-ui/react";
import { useState, createContext } from "react";
import type { FC, PropsWithChildren } from "react";

import type { IModal } from "./interfaces";

type ModalContextType = {
  onOpenModal: (modal: IModal) => void;
  onCloseModal: () => void;
  onCloseAllModals: () => void;
} | null;

export const ModalContext = createContext<ModalContextType>(null);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<IModal[]>([]);

  const onOpenModal = (modal: IModal) => {
    setModals((prevModals) => [...prevModals, modal]);
  };

  const onCloseModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  const onCloseAllModals = () => {
    setModals([]);
  };

  return (
    <ModalContext.Provider value={{ onOpenModal, onCloseModal, onCloseAllModals }}>
      <>{children}</>
      {modals.map((m, i) => (
        <Dialog.Root key={i} {...m.config} open onOpenChange={() => onCloseModal()}>
          <Portal>
            {i === 0 ? <Dialog.Backdrop /> : null}
            <Dialog.Positioner>{m.body}</Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
