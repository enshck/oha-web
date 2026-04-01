import { useQuery as useTanstackQuery } from "@tanstack/react-query";

import useQuery from "./useQuery";
import useToggleErrorToast from "./useToggleErrorToast";
import useToggleLoader from "./useToggleLoader";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("./useToggleErrorToast", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./useToggleLoader", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("api/hooks/useQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useTanstackQuery).mockReturnValue({ isLoading: true, error: null, data: [] } as never);
  });

  it("uses default toggle flags", () => {
    const result = useQuery({ queryKey: ["k"], queryFn: jest.fn() } as never);

    expect(useTanstackQuery).toHaveBeenCalledWith({ queryKey: ["k"], queryFn: expect.any(Function) });
    expect(useToggleLoader).toHaveBeenCalledWith(true, true);
    expect(useToggleErrorToast).toHaveBeenCalledWith(true, null);
    expect(result).toEqual({ isLoading: true, error: null, data: [] });
  });

  it("respects custom toggle flags", () => {
    useQuery({ queryKey: ["k"], queryFn: jest.fn(), toggleGlobalLoader: false, enableErrorHandling: false } as never);

    expect(useToggleLoader).toHaveBeenCalledWith(false, true);
    expect(useToggleErrorToast).toHaveBeenCalledWith(false, null);
  });
});
