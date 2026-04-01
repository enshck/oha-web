import { screen } from "@testing-library/react";

import RootLayout from "./RootLayout";
import { render } from "../__tests__/setup/test-utils";

jest.mock("@tanstack/react-router", () => ({
  Outlet: () => <div data-testid="outlet">Outlet content</div>,
}));

jest.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => <div data-testid="rq-devtools" />,
}));

jest.mock("@tanstack/react-router-devtools", () => ({
  TanStackRouterDevtools: () => <div data-testid="router-devtools" />,
}));

describe("RootLayout", () => {
  it("renders outlet and both devtools", () => {
    render(<RootLayout />);

    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("rq-devtools")).toBeInTheDocument();
    expect(screen.getByTestId("router-devtools")).toBeInTheDocument();
  });
});
