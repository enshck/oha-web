import type { QueryClient } from "@tanstack/react-query";
import { createRouter, createRootRouteWithContext, redirect } from "@tanstack/react-router";

import dashboardRoute from "@/containers/Dashboard/routes";
import RootLayout from "@/layouts/RootLayout";
import { NotFoundPage } from "@/shared/components";
import { NamesOfRoutes } from "@/shared/constants";

// Import type definitions
import "@/definitions/react-router.d.ts";

// Define the root route with context
export const rootRoute = createRootRouteWithContext<IRouterContext>()({
  component: RootLayout,
  beforeLoad: () => {
    if (location.pathname === NamesOfRoutes.APP) {
      throw redirect({ to: NamesOfRoutes.DASHBOARD.ROOT });
    }
  },
});

// Define the route tree structure
const publicRoutes = [...dashboardRoute];

// Define the route tree structure
const routeTree = rootRoute.addChildren([...publicRoutes]);

const router = createRouter({
  defaultNotFoundComponent: () => <NotFoundPage />,
  routeTree,
  context: {
    queryClient: undefined,
  },
});

export interface IRouterContext {
  queryClient?: QueryClient;
}

export default router;
