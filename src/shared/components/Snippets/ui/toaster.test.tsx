import * as Chakra from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

type MockToast = {
  type: "success" | "error" | "warning" | "info" | "loading";
  title?: string;
  description?: string;
  action?: { label: string } | null;
  meta?: { closable?: boolean };
};

jest.mock("@chakra-ui/react", () => {
  let currentToast: MockToast = {
    type: "success",
    title: "Done",
    description: "Completed",
    action: { label: "Undo" },
    meta: { closable: true },
  };

  return {
    __esModule: true,
    createToaster: jest.fn(() => ({ id: "mock-toaster" })),
    __setMockToast: (toast: MockToast) => {
      currentToast = toast;
    },
    Portal: ({ children }: { children: ReactNode }) => <div data-testid="portal">{children}</div>,
    Stack: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Spinner: () => <div data-testid="spinner" />,
    Toaster: ({ children }: { children: (toast: MockToast) => ReactNode }) => <div>{children(currentToast)}</div>,
    Toast: {
      Root: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      Indicator: () => <div data-testid="indicator" />,
      Title: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      Description: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      ActionTrigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
      CloseTrigger: () => <button data-testid="close-trigger">close</button>,
    },
  };
});

import { TOASTER_TYPE, Toaster } from "./toaster";

const setMockToast = (Chakra as typeof Chakra & { __setMockToast: (toast: MockToast) => void }).__setMockToast;

describe("toaster snippet", () => {
  it("creates toaster with expected config and exports enum values", () => {
    expect(jest.mocked(Chakra.createToaster)).toHaveBeenCalledWith({
      placement: "bottom-end",
      pauseOnPageIdle: true,
    });

    expect(TOASTER_TYPE.SUCCESS).toBe("success");
    expect(TOASTER_TYPE.ERROR).toBe("error");
    expect(TOASTER_TYPE.WARNING).toBe("warning");
    expect(TOASTER_TYPE.INFO).toBe("info");
    expect(TOASTER_TYPE.LOADING).toBe("loading");
  });

  it("renders non-loading toast content, action and close trigger", () => {
    setMockToast({
      type: "success",
      title: "Saved",
      description: "Item saved",
      action: { label: "Undo" },
      meta: { closable: true },
    });

    render(<Toaster />);

    expect(screen.getByTestId("portal")).toBeInTheDocument();
    expect(screen.getByTestId("indicator")).toBeInTheDocument();
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Item saved")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    expect(screen.getByTestId("close-trigger")).toBeInTheDocument();
  });

  it("renders loading spinner and hides optional fields when absent", () => {
    setMockToast({
      type: "loading",
      title: "",
      description: "",
      action: null,
      meta: { closable: false },
    });

    render(<Toaster />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByTestId("indicator")).not.toBeInTheDocument();
    expect(screen.queryByTestId("close-trigger")).not.toBeInTheDocument();
  });
});
