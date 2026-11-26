import '@testing-library/jest-dom/vitest';

// Hide React Router's v7 upgrade notices; they're advice, not test failures.
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (String(args[0]).includes('React Router Future Flag Warning')) return;
  originalWarn(...args);
};

// jsdom lacks these browser APIs; framer-motion and our layout use them.
if (typeof window !== 'undefined') {
  class IntersectionObserverMock implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '0px';
    readonly thresholds = [0];

    constructor(private readonly callback: IntersectionObserverCallback) {}

    observe(target: Element): void {
      // Report everything as visible so whileInView animations settle.
      const entry = {
        isIntersecting: true,
        target,
        intersectionRatio: 1,
      } as IntersectionObserverEntry;
      this.callback([entry], this);
    }
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver = IntersectionObserverMock;
  globalThis.IntersectionObserver = IntersectionObserverMock;

  window.matchMedia =
    window.matchMedia ||
    ((query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    }));

  window.scrollTo = (() => {}) as typeof window.scrollTo;
}
