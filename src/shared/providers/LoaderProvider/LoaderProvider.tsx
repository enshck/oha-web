import { Box, Spinner, useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";
import type { FC, PropsWithChildren } from "react";

interface LoaderContextType {
  isLoaderShown: boolean;
  onShowLoader: () => void;
  onHideLoader: () => void;
  onToggleLoader: () => void;
}

export const LoaderContext = createContext<LoaderContextType | null>(null);
const LoaderProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    open: isLoaderShown,
    onOpen: onShowLoader,
    onClose: onHideLoader,
    onToggle: onToggleLoader,
  } = useDisclosure();

  return (
    <>
      <LoaderContext.Provider value={{ isLoaderShown, onShowLoader, onHideLoader, onToggleLoader }}>
        {isLoaderShown && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(255, 255, 255, 0.8)"
            zIndex="9999"
          >
            <Spinner size="xl" color="darkTeal" />
          </Box>
        )}
        {children}
      </LoaderContext.Provider>
    </>
  );
};

export default LoaderProvider;
