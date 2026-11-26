import '@testing-library/jest-dom/vitest';

// Hide React Router's v7 upgrade notices; they're advice, not test failures.
const originalWarn = console.warn;
console.warn = (...args) => {
  if (String(args[0]).includes('React Router Future Flag Warning')) return;
  originalWarn(...args);
};

// jsdom lacks these browser APIs; framer-motion and our layout use them.
if (typeof window !== 'undefined') {
  class IntersectionObserverMock {
    constructor(callback) { this.callback = callback; }
    observe(target) {
      // Report everything as visible so whileInView animations settle.
      this.callback([{ isIntersecting: true, target, intersectionRatio: 1 }], this);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  }
  window.IntersectionObserver = IntersectionObserverMock;
  globalThis.IntersectionObserver = IntersectionObserverMock;

  window.matchMedia = window.matchMedia || ((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() { return false; },
  }));

  window.scrollTo = () => {};
}
