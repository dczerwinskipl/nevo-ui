import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../primitives/Button";
import { Typography } from "../primitives/Typography";
import { useState } from "react";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Modal dialog component for displaying content in an overlay. Supports keyboard navigation (Escape to close) and click-outside-to-close behavior.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj;

// Helper component wrapper for stories
function ModalDemo({
  children,
  title,
  triggerLabel = "Open Modal",
  buttonIntent = "neutral" as const,
}: {
  children: React.ReactNode;
  title: string;
  triggerLabel?: string;
  buttonIntent?: "primary" | "error" | "neutral";
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button intent={buttonIntent} onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </Button>
      {isOpen && (
        <Modal title={title} onClose={() => setIsOpen(false)}>
          {children}
        </Modal>
      )}
    </div>
  );
}

/**
 * Basic modal with simple content
 */
export const Basic: Story = {
  render: () => (
    <ModalDemo title="Basic Modal">
      <Typography type="body">
        This is a basic modal with simple text content.
      </Typography>
    </ModalDemo>
  ),
};

/**
 * Modal with form content
 */
export const WithForm: Story = {
  render: () => (
    <ModalDemo title="Edit Profile" triggerLabel="Open Form Modal">
      <div className="grid gap-4">
        <Typography type="body" className="mb-2">
          Update your profile information below:
        </Typography>
        <div className="grid gap-2">
          <label htmlFor="name-input" className="text-sm font-medium text-text">
            Name
          </label>
          <input
            id="name-input"
            type="text"
            className="px-3 py-2 rounded-lg border border-border bg-card text-text"
            placeholder="Enter your name"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="email-input"
            className="text-sm font-medium text-text"
          >
            Email
          </label>
          <input
            id="email-input"
            type="email"
            className="px-3 py-2 rounded-lg border border-border bg-card text-text"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="ghost">Cancel</Button>
          <Button intent="primary">Save Changes</Button>
        </div>
      </div>
    </ModalDemo>
  ),
};

/**
 * Confirmation modal with action buttons
 */
export const Confirmation: Story = {
  render: function ConfirmationStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <Button intent="error" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        {isOpen && (
          <Modal title="Confirm Deletion" onClose={() => setIsOpen(false)}>
            <div className="grid gap-4">
              <Typography type="body">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </Typography>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button intent="error" onClick={() => setIsOpen(false)}>
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

/**
 * Modal with long content to demonstrate scrolling
 */
export const WithLongContent: Story = {
  render: () => (
    <ModalDemo title="Terms and Conditions" triggerLabel="Open Long Modal">
      <div className="grid gap-4 max-h-96 overflow-y-auto">
        <Typography type="body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Typography type="body">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>
        <Typography type="body">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </Typography>
        <Typography type="body">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </Typography>
        <div className="flex gap-2 justify-end mt-2 sticky bottom-0 bg-raised py-2">
          <Button>I Accept</Button>
        </div>
      </div>
    </ModalDemo>
  ),
};
