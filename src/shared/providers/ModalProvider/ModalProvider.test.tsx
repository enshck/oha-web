import { fireEvent, screen } from "@testing-library/react";

import useModalContext from "./hooks/useModalContext";
import ModalProvider from "./ModalProvider";
import { render } from "../../../__tests__/setup/test-utils";

jest.mock("@chakra-ui/react", () => {
  const actual = jest.requireActual("@chakra-ui/react");

  return {
    ...actual,
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Dialog: {
      ...actual.Dialog,
      Root: ({ children, onOpenChange }: { children: React.ReactNode; onOpenChange?: (details: { open: boolean }) => void }) => (
        <div data-testid="dialog-root" onClick={() => onOpenChange?.({ open: false })}>
          {children}
        </div>
      ),
      Backdrop: () => <div data-testid="dialog-backdrop" />,
      Positioner: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    },
  };
});

const ModalConsumer = () => {
  const { onOpenModal, onCloseModal, onCloseAllModals } = useModalContext();

  return (
    <>
      <button
        onClick={() =>
          onOpenModal({
            body: <div>First modal</div>,
          })
        }
      >
        open-first
      </button>
      <button
        onClick={() =>
          onOpenModal({
            body: <div>Second modal</div>,
          })
        }
      >
        open-second
      </button>
      <button onClick={onCloseModal}>close-one</button>
      <button onClick={onCloseAllModals}>close-all</button>
    </>
  );
};

describe("ModalProvider", () => {
  it("opens and closes modals through context", () => {
    render(
      <ModalProvider>
        <ModalConsumer />
      </ModalProvider>,
    );

    fireEvent.click(screen.getByText("open-first"));
    expect(screen.getByText("First modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("open-second"));
    expect(screen.getByText("Second modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("close-one"));
    expect(screen.queryByText("Second modal")).not.toBeInTheDocument();
    expect(screen.getByText("First modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("close-all"));
    expect(screen.queryByText("First modal")).not.toBeInTheDocument();
  });

  it("closes modal via dialog onOpenChange callback", () => {
    render(
      <ModalProvider>
        <ModalConsumer />
      </ModalProvider>,
    );

    fireEvent.click(screen.getByText("open-first"));
    expect(screen.getByText("First modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("dialog-root"));

    expect(screen.queryByText("First modal")).not.toBeInTheDocument();
  });
});
