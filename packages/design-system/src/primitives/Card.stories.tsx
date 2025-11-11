import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter, CardVariant } from "./Card";
import { Typography } from "./Typography";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Grid } from "../layout/Grid";
import { Flex } from "../layout/Flex";
import { Stack } from "../layout/Stack";
import React from "react";

const meta = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile card component with composable structure. Supports multiple variants, interactive states, and loading state.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated", "flat"] as CardVariant[],
      description: "The visual style variant of the card",
    },
    hoverable: {
      control: "boolean",
      description: "Whether the card has hover effects",
    },
    clickable: {
      control: "boolean",
      description: "Whether the card is clickable",
    },
    loading: {
      control: "boolean",
      description: "Loading state - shows spinner overlay",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: <div>Card content goes here</div>,
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <Grid cols={2} gap={4} className="min-w-[600px]">
      <Card variant="default">
        <Typography type="card-title" className="mb-2">Default</Typography>
        <Typography type="body" intent="neutral">Standard card with subtle shadow</Typography>
      </Card>
      <Card variant="bordered">
        <Typography type="card-title" className="mb-2">Bordered</Typography>
        <Typography type="body" intent="neutral">Card with prominent border</Typography>
      </Card>
      <Card variant="elevated">
        <Typography type="card-title" className="mb-2">Elevated</Typography>
        <Typography type="body" intent="neutral">Card with elevated shadow</Typography>
      </Card>
      <Card variant="flat">
        <Typography type="card-title" className="mb-2">Flat</Typography>
        <Typography type="body" intent="neutral">Flat card with subtle background</Typography>
      </Card>
    </Grid>
  ),
};

// Composable structure
export const ComposableStructure: Story = {
  render: () => (
    <Card className="min-w-[400px]">
      <CardHeader>
        <Flex justify="between" align="center">
          <Typography type="section-title">Product Card</Typography>
          <Badge intent="success">New</Badge>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack gap={3}>
          <Typography type="body">
            This card demonstrates the composable structure with CardHeader,
            CardBody, and CardFooter components.
          </Typography>
          <Typography type="body" intent="neutral">
            Price: <strong>$99.99</strong>
          </Typography>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button variant="solid" intent="primary" size="sm">
          Add to Cart
        </Button>
        <Button variant="outline" intent="neutral" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Interactive cards
export const Interactive: Story = {
  render: () => (
    <Stack gap={4}>
      <Card hoverable className="min-w-[300px]">
        <Typography type="card-title" className="mb-2">Hoverable Card</Typography>
        <Typography type="body" intent="neutral">
          Hover over me to see the effect!
        </Typography>
      </Card>
      <Card clickable onClick={() => alert("Card clicked!")} className="min-w-[300px]">
        <Typography type="card-title" className="mb-2">Clickable Card</Typography>
        <Typography type="body" intent="neutral">
          Click me or press Enter/Space when focused
        </Typography>
      </Card>
      <Card hoverable clickable onClick={() => alert("Card clicked!")} className="min-w-[300px]">
        <Typography type="card-title" className="mb-2">Hoverable + Clickable</Typography>
        <Typography type="body" intent="neutral">
          I have both hover and click effects
        </Typography>
      </Card>
    </Stack>
  ),
};

// Loading state
export const LoadingState: Story = {
  render: () => (
    <Grid cols={2} gap={4}>
      <Card className="min-w-[250px]">
        <CardHeader>
          <Typography type="card-title">Normal Card</Typography>
        </CardHeader>
        <CardBody>
          <Typography type="body">This card is interactive</Typography>
        </CardBody>
      </Card>
      <Card loading className="min-w-[250px]">
        <CardHeader>
          <Typography type="card-title">Loading Card</Typography>
        </CardHeader>
        <CardBody>
          <Typography type="body">This card is loading...</Typography>
        </CardBody>
      </Card>
    </Grid>
  ),
};

// Real-world product cards
export const ProductCards: Story = {
  render: () => (
    <Grid cols={3} gap={4} className="max-w-4xl">
      {[
        {
          name: "Wireless Mouse",
          price: "$29.99",
          status: "In Stock",
          intent: "success" as const,
        },
        {
          name: "Mechanical Keyboard",
          price: "$129.99",
          status: "Low Stock",
          intent: "warning" as const,
        },
        {
          name: "USB-C Hub",
          price: "$49.99",
          status: "New Arrival",
          intent: "info" as const,
        },
      ].map((product, idx) => (
        <Card key={idx} variant="elevated" hoverable>
          <CardHeader>
            <Typography type="card-title">{product.name}</Typography>
          </CardHeader>
          <CardBody>
            <Stack gap={2}>
              <Typography type="body">Price: {product.price}</Typography>
              <Badge intent={product.intent} variant="subtle">
                {product.status}
              </Badge>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button variant="solid" intent="primary" size="sm">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Grid>
  ),
};

// Profile card example
export const ProfileCard: Story = {
  render: () => (
    <Card variant="bordered" className="min-w-[400px]">
      <CardHeader>
        <Flex gap={3} align="center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <Stack gap={0}>
            <Typography type="section-title">John Doe</Typography>
            <Typography type="caption" intent="neutral">
              Software Engineer
            </Typography>
          </Stack>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack gap={3}>
          <div>
            <Typography type="label">About</Typography>
            <Typography type="body" intent="neutral">
              Passionate developer with 5+ years of experience in React and TypeScript.
            </Typography>
          </div>
          <div>
            <Typography type="label">Location</Typography>
            <Typography type="body" intent="neutral">
              San Francisco, CA
            </Typography>
          </div>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button variant="solid" intent="primary" size="sm">
          Connect
        </Button>
        <Button variant="outline" intent="neutral" size="sm">
          Message
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Card grid layout
export const GridLayout: Story = {
  render: () => (
    <Grid cols={3} gap={4} className="max-w-4xl">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <Card key={num} variant="default">
          <Typography type="card-title" className="mb-2">
            Card {num}
          </Typography>
          <Typography type="body" intent="neutral">
            Content for card number {num}
          </Typography>
        </Card>
      ))}
    </Grid>
  ),
};
