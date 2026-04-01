import { renderHook } from "@testing-library/react";

import { TOASTER_TYPE, toaster } from "@/shared/components/Snippets/ui";
import { prepareErrorResponsePayload } from "@/shared/utils";

import useToggleErrorToast from "./useToggleErrorToast";

jest.mock("@/shared/components/Snippets/ui", () => ({
  TOASTER_TYPE: { ERROR: "error" },
  toaster: {
    create: jest.fn(),
  },
}));

jest.mock("@/shared/utils", () => ({
  prepareErrorResponsePayload: jest.fn(),
}));

describe("useToggleErrorToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows error toast when enabled and error exists", () => {
    jest.mocked(prepareErrorResponsePayload).mockReturnValue({ message: "Oops" });

    renderHook(() => useToggleErrorToast(true, new Error("boom")));

    expect(prepareErrorResponsePayload).toHaveBeenCalled();
    expect(toaster.create).toHaveBeenCalledWith({
      title: "Error",
      description: "Oops",
      duration: 5000,
      closable: true,
      type: TOASTER_TYPE.ERROR,
    });
  });

  it("does not show toast when disabled or no error", () => {
    renderHook(() => useToggleErrorToast(false, new Error("boom")));
    renderHook(() => useToggleErrorToast(true, null));

    expect(toaster.create).not.toHaveBeenCalled();
  });
});
