import { createEvent, fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react";

import SearchInput from "./SearchInput";
import { render } from "../../../../__tests__/setup/test-utils";

describe("SearchInput", () => {
  it("renders label and hides clear button when withClearButton is false", () => {
    const onChange = jest.fn();

    render(
      <SearchInput onChange={onChange} label="City" withClearButton={false} placeholder="Find city" value="Paris" />,
    );

    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("calls onChange with empty string when clear button is clicked", () => {
    const onChange = jest.fn();

    render(<SearchInput onChange={onChange} value="Tokyo" placeholder="Find city" />);

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("prevents default on clear button mousedown", () => {
    const onChange = jest.fn();

    render(<SearchInput onChange={onChange} value="Tokyo" placeholder="Find city" />);

    const clearButton = screen.getByLabelText("Clear search");
    const mouseDownEvent = createEvent.mouseDown(clearButton);
    const preventDefaultSpy = jest.spyOn(mouseDownEvent, "preventDefault");

    fireEvent(clearButton, mouseDownEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls onChange with debounced input value", async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();

    render(<SearchInput onChange={onChange} placeholder="Find city" />);

    fireEvent.change(screen.getByPlaceholderText("Find city"), {
      target: { value: "London" },
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("London");
    });

    jest.useRealTimers();
  });
});
