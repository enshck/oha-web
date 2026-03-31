import type { Dialog } from "@chakra-ui/react";

export interface IModal {
  body: React.ReactNode;
  config?: Partial<Omit<Dialog.RootProps, "open">>;
}
