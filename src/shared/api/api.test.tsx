import { METHODS } from "@/shared/constants";
import { request } from "@/shared/utils";

import sharedApi from "./api";
import { API } from "./constants";

jest.mock("@/shared/utils", () => ({
  request: jest.fn(),
}));

describe("shared/api facade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls request factory for cities with query payload", async () => {
    const requestCall = jest.fn().mockResolvedValue([]);
    jest.mocked(request).mockReturnValue(requestCall);

    await sharedApi.getCities({ search: "Tokyo", country: "Japan", continent: "Asia" });

    expect(request).toHaveBeenCalledWith(METHODS.GET, API.LOCATIONS.GET_CITIES);
    expect(requestCall).toHaveBeenCalledWith({ search: "Tokyo", country: "Japan", continent: "Asia" });
  });

  it("calls request factory for countries and continents", async () => {
    const requestCall = jest.fn().mockResolvedValue([]);
    jest.mocked(request).mockReturnValue(requestCall);

    await sharedApi.getCountries();
    await sharedApi.getContinents();

    expect(request).toHaveBeenNthCalledWith(1, METHODS.GET, API.LOCATIONS.GET_COUNTRIES);
    expect(request).toHaveBeenNthCalledWith(2, METHODS.GET, API.LOCATIONS.GET_CONTINENTS);
    expect(requestCall).toHaveBeenCalledTimes(2);
  });
});
