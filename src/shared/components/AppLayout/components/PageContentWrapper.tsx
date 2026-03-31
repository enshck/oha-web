import { Box } from "@chakra-ui/react";
import type { FC, PropsWithChildren } from "react";

export const PageContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box h="full" w="full" overflow="auto">
      {children}
    </Box>
  );
};
