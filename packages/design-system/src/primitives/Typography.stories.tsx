import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";
import { ComponentIntent } from "../theme/types";

const meta = {
  title: "Primitives/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Typography component for consistent text styling across the application. Supports various semantic types, intents, and custom styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "page-title",
        "section-title",
        "card-title",
        "subtitle",
        "body",
        "label",
        "caption",
        "button",
        "error",
        "success",
      ],
      description: "Semantic type of the typography",
    },
    intent: {
      control: "select",
      options: [
        undefined,
        "primary",
        "success",
        "warning",
        "error",
        "info",
        "neutral",
      ] as (ComponentIntent | undefined)[],
      description: "Optional intent for semantic coloring",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj;

/**
 * Page title - largest heading
 */
export const PageTitle: Story = {
  args: {
    type: "page-title",
    children: "Page Title",
  },
};

/**
 * Section title - second level heading
 */
export const SectionTitle: Story = {
  args: {
    type: "section-title",
    children: "Section Title",
  },
};

/**
 * Card title - for use in cards and panels
 */
export const CardTitle: Story = {
  args: {
    type: "card-title",
    children: "Card Title",
  },
};

/**
 * Subtitle - for subheadings
 */
export const Subtitle: Story = {
  args: {
    type: "subtitle",
    children: "Subtitle Text",
  },
};

/**
 * Label - for form labels
 */
export const Label: Story = {
  args: {
    type: "label",
    children: "Label Text",
  },
};

/**
 * Body text - default paragraph text
 */
export const Body: Story = {
  args: {
    type: "body",
    children:
      "This is body text. It's the default size for paragraphs and general content.",
  },
};

/**
 * Caption - smallest text size
 */
export const Caption: Story = {
  args: {
    type: "caption",
    children: "This is caption text, used for annotations and metadata.",
  },
};

/**
 * All typography types shown together
 */
export const AllTypes: Story = {
  render: () => (
    <div className="grid gap-4 max-w-2xl">
      <Typography type="page-title">Page Title</Typography>
      <Typography type="section-title">Section Title</Typography>
      <Typography type="card-title">Card Title</Typography>
      <Typography type="subtitle">Subtitle</Typography>
      <Typography type="label">Label</Typography>
      <Typography type="body">
        Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography type="caption">
        Caption text - Lorem ipsum dolor sit amet
      </Typography>
      <Typography type="button">Button Text</Typography>
      <Typography type="error">Error message text</Typography>
      <Typography type="success">Success message text</Typography>
    </div>
  ),
};

/**
 * Typography with intent colors
 */
export const WithIntents: Story = {
  render: () => (
    <div className="grid gap-3">
      <Typography type="body" intent="primary">
        Primary intent text
      </Typography>
      <Typography type="body" intent="success">
        Success intent text
      </Typography>
      <Typography type="body" intent="warning">
        Warning intent text
      </Typography>
      <Typography type="body" intent="error">
        Error intent text
      </Typography>
      <Typography type="body" intent="info">
        Info intent text
      </Typography>
      <Typography type="body" intent="neutral">
        Neutral intent text
      </Typography>
    </div>
  ),
};

/**
 * Typography in different contexts
 */
export const InContext: Story = {
  render: () => (
    <div className="grid gap-6 max-w-2xl">
      <div>
        <Typography type="section-title" className="mb-2">
          Article Title
        </Typography>
        <Typography type="caption" className="mb-4 text-muted">
          Published on January 15, 2024
        </Typography>
        <Typography type="body" className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography type="body">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>

      <div className="border-t border-border pt-6">
        <Typography type="card-title" className="mb-2">
          Status Messages
        </Typography>
        <div className="grid gap-2">
          <Typography type="body" intent="success">
            ✓ Operation completed successfully
          </Typography>
          <Typography type="body" intent="error">
            ✗ An error occurred during processing
          </Typography>
          <Typography type="body" intent="warning">
            ⚠ This action requires confirmation
          </Typography>
        </div>
      </div>
    </div>
  ),
};
