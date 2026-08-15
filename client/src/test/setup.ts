import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

Object.defineProperties(HTMLMediaElement.prototype, {
  load: {
    configurable: true,
    value: vi.fn(),
  },
  play: {
    configurable: true,
    value: vi.fn().mockRejectedValue(new DOMException("Interaction required")),
  },
  pause: {
    configurable: true,
    value: vi.fn(),
  },
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
