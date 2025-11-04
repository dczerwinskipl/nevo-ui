type Scenario = 
  | 'success'
  | 'empty' 
  | 'loading-slow'
  | 'rate-limit'
  | 'server-error'
  | 'validation-error'
  | 'network-error';

class ScenarioManager {
  private currentScenario: Scenario = 'success';

  set(scenario: Scenario): void {
    this.currentScenario = scenario;
    // Store in localStorage for persistence across page reloads
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock-scenario', scenario);
    }
  }

  current(): Scenario {
    // Check localStorage first for persistence
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mock-scenario') as Scenario;
      if (stored) {
        this.currentScenario = stored;
      }
    }
    return this.currentScenario;
  }

  reset(): void {
    this.currentScenario = 'success';
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock-scenario');
    }
  }

  list(): Scenario[] {
    return [
      'success',
      'empty',
      'loading-slow', 
      'rate-limit',
      'server-error',
      'validation-error',
      'network-error'
    ];
  }
}

export const scenarios = new ScenarioManager();

export function getCurrentScenario(): Scenario {
  return scenarios.current();
}

export function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}