import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import type { Scenario } from "@nevo/api-mocks";
import { Button } from "../primitives/Button";
import { useTheme } from "../theme/ThemeProvider";

interface ApiResponse {
  data: unknown[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Example component demonstrating MSW scenario integration
 * This shows how to test different API states in Storybook
 */
function ApiDataExample({
  hideToolbarHint = false,
}: {
  hideToolbarHint?: boolean;
}) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<Scenario>("success");
  const { tokens } = useTheme();

  // Subscribe to scenario changes
  useEffect(() => {
    // Dynamically import scenarios to avoid build-time dependency
    import("@nevo/api-mocks")
      .then(({ scenarios }) => {
        setScenario(scenarios.current());

        const unsubscribe = scenarios.subscribe((newScenario: Scenario) => {
          setScenario(newScenario);
          // Clear previous state when scenario changes
          setData(null);
          setError(null);
        });

        return () => {
          unsubscribe();
        };
      })
      .catch(() => {
        // MSW not available, ignore
      });
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "system-ui",
        maxWidth: "600px",
        color: tokens.text,
      }}
    >
      <h2 style={{ color: tokens.text }}>MSW Scenario Testing Example</h2>

      <div
        style={{
          padding: "1rem",
          background: tokens.card,
          borderRadius: "4px",
          marginBottom: "1rem",
          border: `1px solid ${tokens.border}`,
        }}
      >
        <strong style={{ color: tokens.text }}>Current Scenario:</strong>{" "}
        {scenario}
        {!hideToolbarHint && (
          <p
            style={{
              fontSize: "0.875rem",
              color: tokens.muted,
              marginTop: "0.5rem",
            }}
          >
            Use the &quot;Mock Scenario&quot; toolbar dropdown above to switch
            scenarios
          </p>
        )}
      </div>

      <Button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </Button>

      {loading && (
        <div style={{ marginTop: "1rem", color: tokens.muted }}>
          ⏳ Loading...
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: tokens.intent.error.bg,
            color: tokens.intent.error.text,
            border: `1px solid ${tokens.intent.error.border}`,
            borderRadius: "4px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && !error ? (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: tokens.intent.success.bg,
            color: tokens.intent.success.text,
            border: `1px solid ${tokens.intent.success.border}`,
            borderRadius: "4px",
          }}
        >
          <strong>Success:</strong> Received{" "}
          {(data as ApiResponse)?.data?.length ||
            (Array.isArray(data) ? data.length : 0)}{" "}
          items
          <pre
            style={{
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              overflow: "auto",
              color: tokens.text,
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : null}
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
This example demonstrates how to test different API scenarios in Storybook
using MSW (Mock Service Worker).

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

The \`withMockScenario\` decorator automatically syncs the toolbar selection
with MSW's ScenarioManager.
This allows you to test how your components handle different API states without
modifying code.
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
  render: () => <ApiDataExample hideToolbarHint={true} />,
};

export const ServerErrorScenario: Story = {
  parameters: {
    mockScenario: "server-error",
  },
  render: () => <ApiDataExample hideToolbarHint={true} />,
};

export const RateLimitScenario: Story = {
  parameters: {
    mockScenario: "rate-limit",
  },
  render: () => <ApiDataExample hideToolbarHint={true} />,
};

export const SlowLoadingScenario: Story = {
  parameters: {
    mockScenario: "loading-slow",
  },
  render: () => <ApiDataExample hideToolbarHint={true} />,
};

export const EmptyScenario: Story = {
  parameters: {
    mockScenario: "empty",
  },
  render: () => <ApiDataExample hideToolbarHint={true} />,
};

export const ValidationErrorScenario: Story = {
  parameters: {
    mockScenario: "validation-error",
  },
  render: () => <ApiDataExample hideToolbarHint={true} />,
};

export const NetworkErrorScenario: Story = {
  parameters: {
    mockScenario: "network-error",
  },
  render: () => <ApiDataExample hideToolbarHint={true} />,
};
