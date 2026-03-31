import { Box, Flex } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function RootLayout() {
  return (
    <Box className="App">
      <Flex w="100%" h="100%" direction="column" alignItems="stretch">
        <Outlet />
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
      </Flex>
    </Box>
  );
}

export default RootLayout;
