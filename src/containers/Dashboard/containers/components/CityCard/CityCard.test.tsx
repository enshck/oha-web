import { fireEvent, screen } from "@testing-library/react";

import CityCard from "./CityCard";
import { mockCities } from "../../../../../__tests__/setup/mocks";
import { render } from "../../../../../__tests__/setup/test-utils";

describe("CityCard", () => {
  it("renders city info and triggers details callback", () => {
    const onDetailsClick = jest.fn();

    render(<CityCard city={mockCities[0]} onDetailsClick={onDetailsClick} />);

    expect(screen.getByRole("heading", { name: mockCities[0].name })).toBeInTheDocument();
    expect(screen.getByText(mockCities[0].country)).toBeInTheDocument();
    expect(screen.getByText(mockCities[0].continent)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Details"));

    expect(onDetailsClick).toHaveBeenCalledWith(mockCities[0]);
  });

  it("hides loading overlay when image loads", () => {
    render(<CityCard city={mockCities[0]} />);

    const image = screen.getByAltText(mockCities[0].name);
    fireEvent.load(image);

    expect(screen.queryByText("Loading image")).not.toBeInTheDocument();
  });

  it("shows fallback preview when image fails", () => {
    render(<CityCard city={mockCities[0]} />);

    const image = screen.getByAltText(mockCities[0].name);
    fireEvent.error(image);

    expect(screen.getByText("City preview")).toBeInTheDocument();
  });
});
