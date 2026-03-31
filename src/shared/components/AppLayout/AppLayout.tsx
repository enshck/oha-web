import { HStack } from "@chakra-ui/react";
import type { FC, PropsWithChildren } from "react";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HStack h="full" w="full" gap="0">
      {children}
    </HStack>
  );
};
