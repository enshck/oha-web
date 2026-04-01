import { renderHook } from "@testing-library/react";

import useModalContext from "./useModalContext";

describe("useModalContext", () => {
  it("throws when used outside provider", () => {
    expect(() => renderHook(() => useModalContext())).toThrow("Initialization of the modal context is required");
  });
});
