import { act, renderHook } from "@testing-library/react";

import { useDebouncedFunction } from "./useDebouncedFunction";

describe("useDebouncedFunction", () => {
  it("returns undefined when no function is provided", () => {
    const { result } = renderHook(() => useDebouncedFunction(undefined, 200));

    expect(result.current).toBeUndefined();
  });

  it("returns debounced function and calls it after delay", () => {
    jest.useFakeTimers();
    const fn = jest.fn();

    const { result } = renderHook(() => useDebouncedFunction(fn, 200));

    result.current?.("hello" as never);

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(fn).toHaveBeenCalledWith("hello");
    jest.useRealTimers();
  });

  it("uses default delay when delay arg is omitted", () => {
    jest.useFakeTimers();
    const fn = jest.fn();

    const { result } = renderHook(() => useDebouncedFunction(fn));

    result.current?.("world" as never);

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(fn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(fn).toHaveBeenCalledWith("world");

    jest.useRealTimers();
  });
});
