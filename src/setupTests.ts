import "@testing-library/jest-dom";

// Polyfill for structuredClone - handle edge cases
if (!global.structuredClone) {
  global.structuredClone = (val) => {
    try {
      return JSON.parse(JSON.stringify(val));
    } catch {
      return val;
    }
  };
}

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
