import { Dialog } from "@chakra-ui/react";
import { fireEvent, screen } from "@testing-library/react";

import CityDetailsModal from "./CityDetailsModal";
import { mockCities } from "../../../../../__tests__/setup/mocks";
import { render } from "../../../../../__tests__/setup/test-utils";

const renderModal = (city = mockCities[0]) =>
  render(
    <Dialog.Root open>
      <Dialog.Positioner>
        <CityDetailsModal city={city} />
      </Dialog.Positioner>
    </Dialog.Root>,
  );

describe("CityDetailsModal", () => {
  it("renders city details and formatted values", () => {
    renderModal();

    expect(screen.getByText(`Native name: ${mockCities[0].name_native}`)).toBeInTheDocument();
    expect(screen.getByText("8,335,897")).toBeInTheDocument();
    expect(screen.getByText("Landmarks")).toBeInTheDocument();
    expect(screen.getByText(mockCities[0].landmarks[0])).toBeInTheDocument();

    const coordinatesLink = screen.getByRole("link", { name: `${mockCities[0].latitude}, ${mockCities[0].longitude}` });
    expect(coordinatesLink).toHaveAttribute("href", expect.stringContaining("google.com/maps?q="));
  });

  it("falls back to zero when population is invalid", () => {
    renderModal({
      ...mockCities[0],
      population: "not-a-number",
    });

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders no landmarks message when list is empty", () => {
    renderModal({
      ...mockCities[0],
      landmarks: [],
      description: "",
    });

    expect(screen.getByText("No landmarks available.")).toBeInTheDocument();
    expect(screen.queryByText(mockCities[0].description)).not.toBeInTheDocument();
  });

  it("shows fallback image block when modal image errors", () => {
    renderModal();

    const image = screen.getByAltText(mockCities[0].name);
    fireEvent.error(image);

    expect(screen.getByText("City preview")).toBeInTheDocument();
  });
});
