import { setupServer } from 'msw/node';

export function setupMocks() {
  const server = setupServer();
  
  return {
    start: () => server.listen({
      onUnhandledRequest: 'bypass'
    }),
    stop: () => server.close(),
    use: server.use.bind(server)
  };
}