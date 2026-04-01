import { tokenHandler } from "./tokenHandler";

describe("tokenHandler", () => {
  afterEach(() => {
    tokenHandler.clear();
  });

  it("stores and retrieves token", () => {
    tokenHandler.set("abc123");

    expect(tokenHandler.get()).toBe("abc123");
  });

  it("clears token", () => {
    tokenHandler.set("abc123");
    tokenHandler.clear();

    expect(tokenHandler.get()).toBeNull();
  });
});
