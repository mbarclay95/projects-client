// jsdom implements no matchMedia. `isMobile` in app.component.ts is evaluated at
// module scope, so this has to exist before a spec imports any component that
// reads it — not merely before the tests run.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});
