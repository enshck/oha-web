import { screen } from "@testing-library/react";
import { lazy, memo } from "react";

import Loadable from "./Loadable";
import { render } from "../../../__tests__/setup/test-utils";

const DummyComponent = memo(() => <div>Loaded content</div>);

describe("Loadable", () => {
  it("renders wrapped component", () => {
    const Wrapped = Loadable(DummyComponent);

    render(<Wrapped />);

    expect(screen.getByText("Loaded content")).toBeInTheDocument();
  });

  it("renders suspense fallback while lazy component is pending", () => {
    const LazyPendingComponent = lazy(() => new Promise(() => {}));
    const Wrapped = Loadable(LazyPendingComponent);

    render(<Wrapped />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
