import { fireEvent, screen } from "@testing-library/react";

import EmptyState from "./EmptyState";
import { render } from "../../../__tests__/setup/test-utils";

describe("EmptyState", () => {
  it("renders icon when icon prop is provided", () => {
    render(<EmptyState title="No data" icon={<span>icon-content</span>} />);

    expect(screen.getByText("icon-content")).toBeInTheDocument();
  });

  it("renders title and optional description", () => {
    render(<EmptyState title="No data" description="Try again later" />);

    expect(screen.getByText("No data")).toBeInTheDocument();
    expect(screen.getByText("Try again later")).toBeInTheDocument();
  });

  it("renders action button and handles click", () => {
    const onClick = jest.fn();

    render(
      <EmptyState
        title="No data"
        actionButton={{
          text: "Reload",
          onClick,
          variant: "outline",
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /reload/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
