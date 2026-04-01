import { renderHook } from "@testing-library/react";

import useLoaderContext from "./useLoaderContext";

describe("useLoaderContext", () => {
  it("throws when used outside provider", () => {
    expect(() => renderHook(() => useLoaderContext())).toThrow("useLoaderContext must be used within a LoaderProvider");
  });
});
