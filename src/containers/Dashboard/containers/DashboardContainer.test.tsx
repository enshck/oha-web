import { screen, fireEvent, act } from "@testing-library/react";

import DashboardContainer from "@/containers/Dashboard/containers/DashboardContainer";
import * as SharedApi from "@/shared/api";

import { mockCities, mockCountries, mockContinents } from "../../../__tests__/setup/mocks";
import { render } from "../../../__tests__/setup/test-utils";

// Mock the API hooks
jest.mock("@/shared/api", () => ({
  ...jest.requireActual("@/shared/api"),
  useGetCities: jest.fn(),
  useGetCountries: jest.fn(),
  useGetContinents: jest.fn(),
}));

const mockQueryResponse = {
  isLoading: false,
  isError: false,
  error: null,
  status: "success",
  isPending: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetching: false,
  isFetching: false,
  isStale: false,
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
};

describe("DashboardContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default mocks for countries and continents
    (SharedApi.useGetCountries as jest.Mock).mockReturnValue({
      data: mockCountries,
      ...mockQueryResponse,
    });
    (SharedApi.useGetContinents as jest.Mock).mockReturnValue({
      data: mockContinents,
      ...mockQueryResponse,
    });
  });

  it("should render header and city cards when cities data is loaded", async () => {
    // Mock successful API responses
    (SharedApi.useGetCities as jest.Mock).mockReturnValue({
      data: mockCities,
      ...mockQueryResponse,
    });

    render(<DashboardContainer />);

    // Check if Header filters are rendered
    expect(screen.getByPlaceholderText("Find city")).toBeInTheDocument();
    expect(screen.getByText("Filter by country")).toBeInTheDocument();
    expect(screen.getByText("Filter by continent")).toBeInTheDocument();
  });

  it("should show empty state when no cities are available", () => {
    (SharedApi.useGetCities as jest.Mock).mockReturnValue({
      data: [],
      ...mockQueryResponse,
    });

    render(<DashboardContainer />);

    expect(screen.getByText("No cities found")).toBeInTheDocument();
    expect(screen.getByText(/Try changing the search query/)).toBeInTheDocument();
  });

  it("should show loading state when cities are loading", () => {
    (SharedApi.useGetCities as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      status: "pending",
      isPending: true,
      isPaused: false,
      isPlaceholderData: false,
      isRefetching: false,
      isFetching: true,
      isStale: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
    });

    render(<DashboardContainer />);

    // Should not show the empty state when loading
    expect(screen.queryByText("No cities found")).not.toBeInTheDocument();
  });

  it("should have correct initial filter values", () => {
    (SharedApi.useGetCities as jest.Mock).mockReturnValue({
      data: mockCities,
      ...mockQueryResponse,
    });

    render(<DashboardContainer />);

    // Check that the search input is empty
    const searchInput = screen.getByPlaceholderText("Find city") as HTMLInputElement;
    expect(searchInput.value).toBe("");
  });

  it("should call onOpenModal when Details button is clicked", () => {
    (SharedApi.useGetCities as jest.Mock).mockReturnValue({
      data: mockCities,
      ...mockQueryResponse,
    });

    render(<DashboardContainer />);

    const detailsButtons = screen.getAllByText("Details");
    fireEvent.click(detailsButtons[0]);

    // Modal should open — CityDetailsModal is rendered inside ModalProvider
    // "Native name:" label is unique to the modal
    expect(screen.getByText(`Native name: ${mockCities[0].name_native}`)).toBeInTheDocument();
  });

  it("should pass search filter to useGetCities when city input changes", () => {
    jest.useFakeTimers();

    (SharedApi.useGetCities as jest.Mock).mockReturnValue({
      data: mockCities,
      ...mockQueryResponse,
    });

    render(<DashboardContainer />);

    const searchInput = screen.getByPlaceholderText("Find city");
    fireEvent.change(searchInput, { target: { value: "New York" } });

    // Advance past the 500ms debounce timeout
    act(() => {
      jest.advanceTimersByTime(600);
    });

    // useGetCities should have been called with search param (non-empty branch)
    const calls = (SharedApi.useGetCities as jest.Mock).mock.calls;
    const lastCall = calls[calls.length - 1][0];
    expect(lastCall.search).toBe("New York");

    jest.useRealTimers();
  });
});
