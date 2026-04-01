import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("returns initial value and updates after delay", () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "a" },
    });

    expect(result.current).toBe("a");

    rerender({ value: "ab" });
    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("ab");
    jest.useRealTimers();
  });

  it("handles cleanup branch when timeout id is falsy", () => {
    jest.useFakeTimers();

    const setTimeoutSpy = jest.spyOn(global, "setTimeout").mockImplementation((cb: TimerHandler) => {
      (cb as () => void)();
      return 0 as unknown as ReturnType<typeof setTimeout>;
    });
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const { unmount } = renderHook(() => useDebounce("value", 300));
    unmount();

    expect(clearTimeoutSpy).not.toHaveBeenCalled();

    setTimeoutSpy.mockRestore();
    clearTimeoutSpy.mockRestore();
    jest.useRealTimers();
  });
});
