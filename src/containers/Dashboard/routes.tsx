import { createRoute, Outlet } from "@tanstack/react-router";
import { lazy } from "react";

import { rootRoute } from "@/routes";
import { Loadable } from "@/shared/components";
import { NamesOfChildRoutes, NamesOfRoutes } from "@/shared/constants";

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: NamesOfRoutes.DASHBOARD.ROOT,
  component: () => <Outlet />,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: NamesOfChildRoutes.DASHBOARD.INDEX,
  component: Loadable(lazy(() => import("@/containers/Dashboard/containers/DashboardContainer"))),
});

export default [dashboardRoute.addChildren([dashboardIndexRoute])];
