import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

import { LoaderProvider } from "@/shared/providers";

import sharedApi from "./api";
import { SharedQuery, useGetCities, useGetContinents, useGetCountries } from "./locations.api";

jest.mock("./api", () => ({
  __esModule: true,
  default: {
    getCities: jest.fn(),
    getCountries: jest.fn(),
    getContinents: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>{children}</LoaderProvider>
    </QueryClientProvider>
  );
};

describe("locations.api hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls getCities with provided filters", async () => {
    jest.mocked(sharedApi.getCities).mockResolvedValue([]);

    const { result } = renderHook(() => useGetCities({ continent: "Asia", country: "Japan", search: "Tokyo" }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(sharedApi.getCities).toHaveBeenCalledWith({ continent: "Asia", country: "Japan", search: "Tokyo" });
    expect(result.current.data).toEqual([]);
  });

  it("calls getCountries and getContinents", async () => {
    jest.mocked(sharedApi.getCountries).mockResolvedValue(["Japan"]);
    jest.mocked(sharedApi.getContinents).mockResolvedValue(["Asia"]);

    const { result: countriesResult } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });
    const { result: continentsResult } = renderHook(() => useGetContinents(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(countriesResult.current.isSuccess).toBe(true);
      expect(continentsResult.current.isSuccess).toBe(true);
    });

    expect(sharedApi.getCountries).toHaveBeenCalledTimes(1);
    expect(sharedApi.getContinents).toHaveBeenCalledTimes(1);
  });

  it("exports expected SharedQuery enum values", () => {
    expect(SharedQuery.getCities).toBe("getCities");
    expect(SharedQuery.getCountries).toBe("getCountries");
    expect(SharedQuery.getContinents).toBe("getContinents");
  });
});
