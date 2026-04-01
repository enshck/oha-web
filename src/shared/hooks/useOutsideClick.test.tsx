import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

import { useOutsideClick } from "./useOutsideClick";

const Harness = ({ enabled = true, handler }: { enabled?: boolean; handler?: (e: Event) => void }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick({ enabled, ref, handler });

  return (
    <>
      <div ref={ref} data-testid="inside" />
      <div data-testid="outside" />
    </>
  );
};

const HarnessWithoutEnabled = ({ handler }: { handler?: (e: Event) => void }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick({ ref, handler });

  return (
    <>
      <div ref={ref} data-testid="inside-default-enabled" />
      <div data-testid="outside-default-enabled" />
    </>
  );
};

describe("useOutsideClick", () => {
  it("calls handler when clicking outside", () => {
    const handler = jest.fn();

    render(<Harness handler={handler} />);

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not call handler when clicking inside or disabled", () => {
    const handler = jest.fn();

    const { rerender } = render(<Harness handler={handler} />);

    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(handler).not.toHaveBeenCalled();

    rerender(<Harness handler={handler} enabled={false} />);
    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handler).not.toHaveBeenCalled();
  });

  it("uses enabled=true by default when enabled is omitted", () => {
    const handler = jest.fn();

    render(<HarnessWithoutEnabled handler={handler} />);

    fireEvent.mouseDown(screen.getByTestId("outside-default-enabled"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
