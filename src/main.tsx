import "@/assets/styles/index.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import theme from "@/assets/theme/theme";
import router from "@/routes";
import { Toaster } from "@/shared/components/Snippets/ui";
import { LoaderProvider, ModalProvider } from "@/shared/providers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: Infinity,
    },
    mutations: {
      retry: 0,
    },
  },
});

function InnerApp() {
  return <RouterProvider router={router} context={{ queryClient }} />;
}

function App() {
  return (
    <ChakraProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          <ModalProvider>
            <InnerApp />
          </ModalProvider>
        </LoaderProvider>
      </QueryClientProvider>
      <Toaster />
    </ChakraProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
