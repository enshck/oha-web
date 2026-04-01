import { useMutation as useTanstackMutation } from "@tanstack/react-query";

import useMutation from "./useMutation";
import useToggleErrorToast from "./useToggleErrorToast";
import useToggleLoader from "./useToggleLoader";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("./useToggleErrorToast", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./useToggleLoader", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("api/hooks/useMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useTanstackMutation).mockReturnValue({ isPending: true, error: null } as never);
  });

  it("uses default toggle flags", () => {
    const result = useMutation({ mutationFn: jest.fn() } as never);

    expect(useTanstackMutation).toHaveBeenCalledWith({ mutationFn: expect.any(Function) });
    expect(useToggleErrorToast).toHaveBeenCalledWith(true, null);
    expect(useToggleLoader).toHaveBeenCalledWith(true, true);
    expect(result).toEqual({ isPending: true, error: null });
  });

  it("respects custom toggle flags", () => {
    useMutation({ mutationFn: jest.fn(), toggleGlobalLoader: false, enableErrorHandling: false } as never);

    expect(useToggleErrorToast).toHaveBeenCalledWith(false, null);
    expect(useToggleLoader).toHaveBeenCalledWith(false, true);
  });
});
