import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import type { Scenario } from "@nevo/api-mocks";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { Typography } from "../primitives/Typography";
import { Alert } from "../feedback/Alert";

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
    <div style={{ maxWidth: "600px" }}>
      <Typography type="section-title" className="mb-4">
        MSW Scenario Testing Example
      </Typography>

      <Card className="mb-4">
        <Typography type="body" className="mb-2">
          <strong>Current Scenario:</strong> {scenario}
        </Typography>
        {!hideToolbarHint && (
          <Typography type="caption" intent="neutral">
            Use the &quot;Mock Scenario&quot; toolbar dropdown above to switch
            scenarios
          </Typography>
        )}
      </Card>

      <Button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </Button>

      {loading && (
        <Typography type="body" intent="neutral" className="mt-4">
          ⏳ Loading...
        </Typography>
      )}

      {error && (
        <Alert intent="error" className="mt-4">
          <strong>Error:</strong> {error}
        </Alert>
      )}

      {data && !error ? (
        <Alert intent="success" className="mt-4">
          <strong>Success:</strong> Received{" "}
          {(data as ApiResponse)?.data?.length ||
            (Array.isArray(data) ? data.length : 0)}{" "}
          items
          <pre
            style={{
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              overflow: "auto",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </Alert>
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
