import { setupWorker } from "msw/browser";
import type { RequestHandler } from "msw";

export function setupMocks(handlers: RequestHandler[] = []) {
  const worker = setupWorker(...handlers);

  return {
    start: () =>
      worker.start({
        onUnhandledRequest: "bypass",
      }),
    stop: () => worker.stop(),
    use: worker.use.bind(worker),
  };
}
