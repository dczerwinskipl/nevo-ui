// Jest setup file
require("@testing-library/jest-dom");

// Mock IntersectionObserver if needed for components
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver if needed
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia for responsive components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress console warnings in tests unless explicitly testing them
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is deprecated")
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalConsoleError;
});

// Custom matchers for better test assertions
expect.extend({
  toHaveAccessibleName(received, expectedName) {
    let accessibleName = received.getAttribute("aria-label");

    // If no aria-label, try to resolve aria-labelledby
    if (!accessibleName) {
      const labelledBy = received.getAttribute("aria-labelledby");
      if (labelledBy) {
        const labelElement = document.getElementById(labelledBy);
        accessibleName = labelElement ? labelElement.textContent : labelledBy;
      }
    }

    // Fall back to text content
    if (!accessibleName) {
      accessibleName = received.textContent;
    }

    const pass = accessibleName === expectedName;

    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have accessible name "${expectedName}"`
          : `Expected element to have accessible name "${expectedName}", ` +
            `but got "${accessibleName}"`,
    };
  },
});
