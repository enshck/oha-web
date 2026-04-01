import axios from "axios";

import { request } from "./request";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      request: jest.fn(),
    })),
  },
}));

describe("request", () => {
  const getRequestMock = () => ((axios as unknown as { create: jest.Mock }).create.mock.results[0].value.request as jest.Mock);

  beforeEach(() => {
    getRequestMock().mockReset();
  });

  it("sends params for GET requests", async () => {
    const requestMock = getRequestMock();
    requestMock.mockResolvedValue({ data: { ok: true } });

    const call = request("get", "/cities");
    const data = await call({ search: "Tokyo" });

    expect(data).toEqual({ ok: true });
    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "get",
        url: "/cities",
        params: { search: "Tokyo" },
      }),
    );
  });

  it("sends data for non-GET requests and propagates errors", async () => {
    const requestMock = getRequestMock();
    const error = new Error("Request failed");
    requestMock.mockRejectedValue(error);

    const call = request("post", "/cities", { Authorization: "Bearer token" });

    await expect(call({ name: "Kyoto" })).rejects.toThrow("Request failed");
    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "post",
        url: "/cities",
        headers: { Authorization: "Bearer token" },
        data: { name: "Kyoto" },
      }),
    );
  });
});
