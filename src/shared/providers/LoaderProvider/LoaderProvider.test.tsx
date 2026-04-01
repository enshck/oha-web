import { fireEvent, screen } from "@testing-library/react";

import useLoaderContext from "./hooks/useLoaderContext";
import LoaderProvider from "./LoaderProvider";
import { render } from "../../../__tests__/setup/test-utils";

const LoaderConsumer = () => {
  const { isLoaderShown, onShowLoader, onHideLoader, onToggleLoader } = useLoaderContext();

  return (
    <>
      <div data-testid="loader-state">{String(isLoaderShown)}</div>
      <button onClick={onShowLoader}>show</button>
      <button onClick={onHideLoader}>hide</button>
      <button onClick={onToggleLoader}>toggle</button>
    </>
  );
};

describe("LoaderProvider", () => {
  it("shows and hides loader via context", () => {
    render(
      <LoaderProvider>
        <LoaderConsumer />
      </LoaderProvider>,
    );

    expect(screen.getByTestId("loader-state")).toHaveTextContent("false");

    fireEvent.click(screen.getByText("show"));
    expect(screen.getByTestId("loader-state")).toHaveTextContent("true");

    fireEvent.click(screen.getByText("hide"));
    expect(screen.getByTestId("loader-state")).toHaveTextContent("false");

    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("loader-state")).toHaveTextContent("true");
  });
});
