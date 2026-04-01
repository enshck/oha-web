import { NamesOfChildRoutes, NamesOfRoutes } from "@/shared/constants";

const createRouteMock = jest.fn();
const lazyMock = jest.fn((factory: unknown) => {
  void factory;
  return "lazy-component";
});
const loadableMock = jest.fn((component: unknown) => ({ wrapped: component }));
const rootRouteMock = { id: "root" };

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  lazy: (factory: unknown) => lazyMock(factory),
}));

jest.mock("@tanstack/react-router", () => ({
  createRoute: (config: unknown) => createRouteMock(config),
  Outlet: () => null,
}));

jest.mock("@/routes", () => ({
  rootRoute: rootRouteMock,
}));

jest.mock("@/shared/components", () => ({
  Loadable: (component: unknown) => loadableMock(component),
}));

describe("dashboard routes", () => {
  it("creates dashboard and index routes with expected paths", async () => {
    const dashboardRouteMock = {
      addChildren: jest.fn(() => ({ id: "dashboard-with-children" })),
    };

    createRouteMock.mockReturnValueOnce(dashboardRouteMock).mockReturnValueOnce({ id: "dashboard-index" });

    const module = await import("./routes");

    const dashboardConfig = createRouteMock.mock.calls[0][0] as {
      getParentRoute: () => unknown;
      component: () => unknown;
    };
    const indexConfig = createRouteMock.mock.calls[1][0] as {
      getParentRoute: () => unknown;
    };

    expect(dashboardConfig.getParentRoute()).toBe(rootRouteMock);
    dashboardConfig.component();
    expect(indexConfig.getParentRoute()).toBe(dashboardRouteMock);

    expect(createRouteMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: NamesOfRoutes.DASHBOARD.ROOT,
      }),
    );
    expect(createRouteMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: NamesOfChildRoutes.DASHBOARD.INDEX,
      }),
    );
    expect(lazyMock).toHaveBeenCalledTimes(1);

    // Execute lazy factory callback to cover dynamic import path
    const lazyFactory = lazyMock.mock.calls[0][0] as () => Promise<unknown>;
    await expect(lazyFactory()).resolves.toBeDefined();

    expect(loadableMock).toHaveBeenCalledWith("lazy-component");
    expect(dashboardRouteMock.addChildren).toHaveBeenCalledWith([{ id: "dashboard-index" }]);
    expect(module.default).toEqual([{ id: "dashboard-with-children" }]);
  });
});
