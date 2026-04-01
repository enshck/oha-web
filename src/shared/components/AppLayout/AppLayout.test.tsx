import { screen } from "@testing-library/react";

import { AppLayout } from "./AppLayout";
import { render } from "../../../__tests__/setup/test-utils";

describe("AppLayout", () => {
  it("renders children", () => {
    render(
      <AppLayout>
        <div>App content</div>
      </AppLayout>,
    );

    expect(screen.getByText("App content")).toBeInTheDocument();
  });
});
