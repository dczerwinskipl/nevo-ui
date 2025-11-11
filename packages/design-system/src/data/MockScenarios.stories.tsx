import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { scenarios } from "@nevo/api-mocks";
import { Button } from "../primitives/Button";

/**
 * Example component demonstrating MSW scenario integration
 * This shows how to test different API states in Storybook
 */
function ApiDataExample() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState(scenarios.current());

  // Subscribe to scenario changes
  useEffect(() => {
    const unsubscribe = scenarios.subscribe((newScenario) => {
      setScenario(newScenario);
      // Clear previous state when scenario changes
      setData(null);
      setError(null);
    });
    return unsubscribe;
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("/api/products");
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: "600px" }}>
      <h2>MSW Scenario Testing Example</h2>
      
      <div style={{ 
        padding: "1rem", 
        background: "#f5f5f5", 
        borderRadius: "4px",
        marginBottom: "1rem" 
      }}>
        <strong>Current Scenario:</strong> {scenario}
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
          Use the "Mock Scenario" toolbar dropdown above to switch scenarios
        </p>
      </div>

      <Button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </Button>

      {loading && (
        <div style={{ marginTop: "1rem", color: "#666" }}>
          ⏳ Loading...
        </div>
      )}

      {error && (
        <div style={{ 
          marginTop: "1rem", 
          padding: "1rem", 
          background: "#fee", 
          color: "#c00",
          borderRadius: "4px" 
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && !error && (
        <div style={{ 
          marginTop: "1rem", 
          padding: "1rem", 
          background: "#efe", 
          borderRadius: "4px" 
        }}>
          <strong>Success:</strong> Received {Array.isArray(data) ? data.length : 0} items
          <pre style={{ 
            marginTop: "0.5rem", 
            fontSize: "0.75rem",
            overflow: "auto" 
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof ApiDataExample> = {
  title: "Examples/MSW Scenarios",
  component: ApiDataExample,
  parameters: {
    docs: {
      description: {
        component: `
This example demonstrates how to test different API scenarios in Storybook using MSW (Mock Service Worker).

## How to Use

1. Use the **Mock Scenario** toolbar dropdown to switch between scenarios
2. Click the **Fetch Data** button to simulate an API call
3. Observe how different scenarios affect the response

## Available Scenarios

- ✅ **Success** - Normal response with 300ms delay
- ⭕ **Empty** - Empty data array
- ⏱️ **Slow Loading** - 3 second delay (tests loading states)
- 🛑 **Rate Limit** - HTTP 429 error
- ❌ **Server Error** - HTTP 500 error
- ⚠️ **Validation Error** - HTTP 422 error
- 🌐 **Network Error** - Connection failure

## Implementation

The \`withMockScenario\` decorator automatically syncs the toolbar selection with MSW's ScenarioManager.
This allows you to test how your components handle different API states without modifying code.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApiDataExample>;

export const Default: Story = {
  render: () => <ApiDataExample />,
};

export const SuccessScenario: Story = {
  parameters: {
    mockScenario: "success",
  },
  render: () => <ApiDataExample />,
};

export const ServerErrorScenario: Story = {
  parameters: {
    mockScenario: "server-error",
  },
  render: () => <ApiDataExample />,
};

export const RateLimitScenario: Story = {
  parameters: {
    mockScenario: "rate-limit",
  },
  render: () => <ApiDataExample />,
};

export const SlowLoadingScenario: Story = {
  parameters: {
    mockScenario: "loading-slow",
  },
  render: () => <ApiDataExample />,
};
