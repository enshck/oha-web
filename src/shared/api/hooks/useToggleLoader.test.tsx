import { renderHook } from "@testing-library/react";

import { useLoaderContext } from "@/shared/providers";

import useToggleLoader from "./useToggleLoader";

jest.mock("@/shared/providers", () => ({
  useLoaderContext: jest.fn(),
}));

describe("useToggleLoader", () => {
  const onShowLoader = jest.fn();
  const onHideLoader = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useLoaderContext).mockReturnValue({
      isLoaderShown: false,
      onShowLoader,
      onHideLoader,
      onToggleLoader: jest.fn(),
    });
  });

  it("shows loader when loading and toggle is enabled", () => {
    renderHook(() => useToggleLoader(true, true));

    expect(onShowLoader).toHaveBeenCalledTimes(1);
    expect(onHideLoader).not.toHaveBeenCalled();
  });

  it("hides loader when not loading and toggle is enabled", () => {
    renderHook(() => useToggleLoader(true, false));

    expect(onHideLoader).toHaveBeenCalledTimes(1);
    expect(onShowLoader).not.toHaveBeenCalled();
  });

  it("does nothing when global loader toggle is disabled", () => {
    renderHook(() => useToggleLoader(false, true));

    expect(onShowLoader).not.toHaveBeenCalled();
    expect(onHideLoader).not.toHaveBeenCalled();
  });
});
