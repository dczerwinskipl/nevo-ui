import { setupWorker } from 'msw/browser';

export function setupMocks() {
  const worker = setupWorker();
  
  return {
    start: () => worker.start({
      onUnhandledRequest: 'bypass'
    }),
    stop: () => worker.stop(),
    use: worker.use.bind(worker)
  };
}