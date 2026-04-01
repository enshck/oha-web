import { fireEvent, screen } from "@testing-library/react";

import { NamesOfRoutes } from "@/shared/constants";

import NotFoundPage from "./NotFountPage";
import { render } from "../../../__tests__/setup/test-utils";

const navigateMock = jest.fn();
const emptyStateMock = jest.fn();

jest.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

jest.mock("@/shared/components", () => ({
  EmptyState: (props: {
    title: string;
    description?: string;
    actionButton?: { text: string; onClick: () => void };
  }) => {
    emptyStateMock(props);
    return (
      <div>
        <h1>{props.title}</h1>
        {props.description ? <p>{props.description}</p> : null}
        {props.actionButton ? <button onClick={props.actionButton.onClick}>{props.actionButton.text}</button> : null}
      </div>
    );
  },
}));

describe("NotFoundPage", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    emptyStateMock.mockClear();
  });

  it("passes expected props to EmptyState", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, the page you are looking for doesn't exist or has been moved."),
    ).toBeInTheDocument();
    expect(emptyStateMock).toHaveBeenCalledTimes(1);
  });

  it("navigates home on button click", () => {
    render(<NotFoundPage />);

    fireEvent.click(screen.getByRole("button", { name: /go home/i }));

    expect(navigateMock).toHaveBeenCalledWith({ to: NamesOfRoutes.APP });
  });
});
