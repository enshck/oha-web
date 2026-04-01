import { debounce, getOptions, prepareErrorResponsePayload } from "./functions";
import type { IErrorResponse } from "../interfaces";

describe("shared utils/functions", () => {
  it("prepareErrorResponsePayload uses default message when customMessage is not set", () => {
    const backendError: IErrorResponse = { message: "Backend error" };
    const payload = prepareErrorResponsePayload(backendError);

    expect(payload.message).toBe("Something went wrong. Try Again");
  });

  it("prepareErrorResponsePayload preserves message when customMessage=true", () => {
    const backendError: IErrorResponse = {
      message: "Custom backend message",
      customMessage: true,
    };
    const payload = prepareErrorResponsePayload(backendError);

    expect(payload.message).toBe("Custom backend message");
  });

  it("debounce calls function once with latest args", () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const debounced = debounce(fn, 200);

    debounced("a");
    debounced("b");

    jest.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
    jest.useRealTimers();
  });

  it("debounce uses default waitFor when omitted", () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const debounced = debounce(fn);

    debounced("x");

    jest.advanceTimersByTime(499);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledWith("x");
    jest.useRealTimers();
  });

  it("getOptions maps data to label/value pairs", () => {
    expect(getOptions(["US", "JP"])).toEqual([
      { label: "US", value: "US" },
      { label: "JP", value: "JP" },
    ]);
  });
});
