import { screen } from "@testing-library/react";

import Select from "./Select";
import { render } from "../../../../__tests__/setup/test-utils";

const options = [
  { label: "United States", value: "US" },
  { label: "Japan", value: "JP" },
];

describe("Select", () => {
  it("renders label and required marker path", () => {
    render(<Select label="Country" isRequired isTouched errorMessage="Required" options={options} />);

    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("covers non-required and no-label paths", () => {
    const { rerender } = render(<Select label="Continent" isRequired={false} options={options} />);

    expect(screen.getByText("Continent")).toBeInTheDocument();

    rerender(<Select options={options} isTouched={false} errorMessage="Should not show" />);

    expect(screen.queryByText("Continent")).not.toBeInTheDocument();
    expect(screen.queryByText("Should not show")).not.toBeInTheDocument();
  });
});
