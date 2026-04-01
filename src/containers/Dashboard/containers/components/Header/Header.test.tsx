import { fireEvent, screen } from "@testing-library/react";

import * as SharedApi from "@/shared/api";

import Header from "./Header";
import { render } from "../../../../../__tests__/setup/test-utils";

jest.mock("@/shared/api", () => ({
  ...jest.requireActual("@/shared/api"),
  useGetCountries: jest.fn(),
  useGetContinents: jest.fn(),
}));

jest.mock("@/shared/components", () => ({
  SearchInput: ({ onChange, placeholder }: { onChange: (value: string) => void; placeholder?: string }) => (
    <input data-testid="search-input" placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
  ),
  Select: ({
    placeholder,
    value,
    options,
    onSelect,
    onClear,
  }: {
    placeholder?: string;
    value?: string[];
    options?: Array<{ label: string; value: unknown }>;
    onSelect: (data: { value: string }) => void;
    onClear?: () => void;
  }) => (
    <div>
      <button type="button" onClick={() => onSelect({ value: `${placeholder}-value` })}>
        {placeholder}
      </button>
      <span data-testid={`${placeholder}-value`}>{(value ?? []).join(",")}</span>
      <span data-testid={`${placeholder}-options-count`}>{String((options ?? []).length)}</span>
      {onClear ? (
        <button type="button" onClick={onClear}>
          clear-{placeholder}
        </button>
      ) : null}
    </div>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (SharedApi.useGetCountries as jest.Mock).mockReturnValue({ data: ["United States", "Japan"] });
    (SharedApi.useGetContinents as jest.Mock).mockReturnValue({ data: ["North America", "Asia"] });
  });

  it("updates city filter from search", () => {
    const setFilters = jest.fn();

    render(<Header filters={{ city: "", country: null, continent: null }} setFilters={setFilters} />);

    fireEvent.change(screen.getByTestId("search-input"), { target: { value: "Tokyo" } });

    const updater = setFilters.mock.calls[0][0] as (prev: {
      city: string;
      country: string | null;
      continent: string | null;
    }) => {
      city: string;
      country: string | null;
      continent: string | null;
    };

    expect(updater({ city: "", country: null, continent: null })).toEqual({
      city: "Tokyo",
      country: null,
      continent: null,
    });
  });

  it("updates and clears country and continent filters", () => {
    const setFilters = jest.fn();

    render(<Header filters={{ city: "", country: null, continent: null }} setFilters={setFilters} />);

    fireEvent.click(screen.getByText("Filter by country"));
    fireEvent.click(screen.getByText("clear-Filter by country"));
    fireEvent.click(screen.getByText("Filter by continent"));
    fireEvent.click(screen.getByText("clear-Filter by continent"));

    expect(setFilters).toHaveBeenCalledTimes(4);
  });

  it("uses empty arrays when countries and continents data are missing", () => {
    const setFilters = jest.fn();
    (SharedApi.useGetCountries as jest.Mock).mockReturnValue({});
    (SharedApi.useGetContinents as jest.Mock).mockReturnValue({});

    render(<Header filters={{ city: "", country: null, continent: null }} setFilters={setFilters} />);

    expect(screen.getByTestId("Filter by country-options-count")).toHaveTextContent("0");
    expect(screen.getByTestId("Filter by continent-options-count")).toHaveTextContent("0");
  });

  it("passes selected country and continent values to selects", () => {
    const setFilters = jest.fn();

    render(<Header filters={{ city: "", country: "Japan", continent: "Asia" }} setFilters={setFilters} />);

    expect(screen.getByTestId("Filter by country-value")).toHaveTextContent("Japan");
    expect(screen.getByTestId("Filter by continent-value")).toHaveTextContent("Asia");
  });
});
