/**
 * Available mock scenarios for testing different API states
 */
export type Scenario =
  | "success"
  | "empty"
  | "loading-slow"
  | "rate-limit"
  | "server-error"
  | "validation-error"
  | "network-error";

/**
 * Manages mock API scenarios for testing
 * Supports localStorage persistence, event dispatching, and subscriptions
 */
class ScenarioManager {
  private currentScenario: Scenario = "success";
  private listeners: Set<(scenario: Scenario) => void> = new Set();

  /**
   * Set the current mock scenario
   * @param scenario - The scenario to activate
   */
  set(scenario: Scenario): void {
    const previous = this.currentScenario;
    this.currentScenario = scenario;

    // Store in localStorage for persistence across page reloads
    if (typeof window !== "undefined") {
      localStorage.setItem("mock-scenario", scenario);

      // Dispatch custom event for UI updates (Storybook, debugging tools)
      window.dispatchEvent(
        new CustomEvent("mock-scenario-change", {
          detail: { scenario, previous },
        })
      );
    }

    // Notify all subscribers
    this.listeners.forEach((listener) => listener(scenario));
  }

  /**
   * Get the current mock scenario
   * @returns The current scenario
   */
  current(): Scenario {
    // Check localStorage first for persistence
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mock-scenario") as Scenario;
      if (stored && this.isValidScenario(stored)) {
        this.currentScenario = stored;
      }
    }
    return this.currentScenario;
  }

  /**
   * Reset scenario to 'success' and clear localStorage
   */
  reset(): void {
    this.set("success");
    if (typeof window !== "undefined") {
      localStorage.removeItem("mock-scenario");
    }
  }

  /**
   * Get list of all available scenarios
   * @returns Array of scenario names
   */
  list(): Scenario[] {
    return [
      "success",
      "empty",
      "loading-slow",
      "rate-limit",
      "server-error",
      "validation-error",
      "network-error",
    ];
  }

  /**
   * Subscribe to scenario changes
   * @param listener - Callback function called when scenario changes
   * @returns Unsubscribe function
   */
  subscribe(listener: (scenario: Scenario) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Check if a string is a valid scenario
   * @param value - String to validate
   * @returns True if valid scenario
   */
  private isValidScenario(value: string): value is Scenario {
    return this.list().includes(value as Scenario);
  }
}

export const scenarios = new ScenarioManager();

/**
 * Get the current scenario
 * @returns The current active scenario
 */
export function getCurrentScenario(): Scenario {
  return scenarios.current();
}

/**
 * Simulate network delay for testing
 * @param ms - Delay in milliseconds (default: 300)
 * @returns Promise that resolves after delay
 */
export function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Global window API for Playwright and Storybook integration
if (typeof window !== "undefined") {
  /**
   * Set mock scenario globally (available in browser console and Playwright)
   */
  (window as any).setMockScenario = (scenario: Scenario) => {
    scenarios.set(scenario);
  };

  /**
   * Get current mock scenario
   */
  (window as any).getMockScenario = (): Scenario => {
    return scenarios.current();
  };

  /**
   * Reset mock scenario to 'success'
   */
  (window as any).resetMockScenario = () => {
    scenarios.reset();
  };

  /**
   * Get list of all available scenarios
   */
  (window as any).listMockScenarios = (): Scenario[] => {
    return scenarios.list();
  };
}

// TypeScript declarations for window extensions
declare global {
  interface Window {
    setMockScenario: (scenario: Scenario) => void;
    getMockScenario: () => Scenario;
    resetMockScenario: () => void;
    listMockScenarios: () => Scenario[];
  }
}
