import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactNode } from "react";

import theme from "@/assets/theme/theme";
import { ModalProvider } from "@/shared/providers";

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      <QueryClientProvider client={testQueryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

const customRender = (ui: ReactNode, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
