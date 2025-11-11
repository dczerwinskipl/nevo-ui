import type { Meta, StoryObj } from "@storybook/react";
import { Topbar } from "./Topbar";
import { Card } from "../primitives/Card";

const meta: Meta<typeof Topbar> = {
  title: "Navigation/Topbar",
  component: Topbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Topbar navigation component with search, notifications, theme toggle, and mobile menu button. Sticky header with responsive design.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {
  render: () => (
    <div>
      <Topbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Page Content</h1>
        <p className="text-sm text-muted mb-4">
          The topbar is sticky and stays at the top of the page when scrolling.
        </p>
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <Card key={i} className="p-4">
              Content block {i + 1}
            </Card>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const WithMenuHandler: Story = {
  render: () => {
    const handleMenu = () => {
      alert("Menu button clicked!");
    };

    return (
      <div>
        <Topbar onMenu={handleMenu} />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">With Menu Handler</h1>
          <p className="text-sm text-muted">
            Click the menu button (visible on mobile) to trigger the menu
            handler.
          </p>
        </div>
      </div>
    );
  },
};

export const InLayout: Story = {
  render: () => (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Application Layout</h1>
        <p className="text-sm text-muted mb-8">
          The topbar is part of a full application layout with scrollable
          content.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <Card key={i} className="p-6">
              <h3 className="font-semibold mb-2">Card {i + 1}</h3>
              <p className="text-sm text-muted">
                Sample card content for layout demonstration
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div>
      <Topbar onMenu={() => alert("Mobile menu opened")} />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Mobile View</h1>
        <p className="text-sm text-muted">
          On mobile, the search bar is hidden and replaced with a search button.
          The menu button is visible to open the sidebar.
        </p>
      </div>
    </div>
  ),
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  render: () => (
    <div>
      <Topbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tablet View</h1>
        <p className="text-sm text-muted">
          On tablet, the topbar adjusts its spacing and button sizes for better
          touch interaction.
        </p>
      </div>
    </div>
  ),
};

export const WithLongScroll: Story = {
  render: () => (
    <div>
      <Topbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sticky Topbar Demo</h1>
        <p className="text-sm text-muted mb-8">
          Scroll down to see the topbar stay at the top of the viewport.
        </p>
        {Array.from({ length: 50 }, (_, i) => (
          <Card key={i} className="p-4 mb-4">
            <h3 className="font-semibold mb-2">Section {i + 1}</h3>
            <p className="text-sm text-muted">
              This is content section {i + 1}. The topbar remains visible as you
              scroll.
            </p>
          </Card>
        ))}
      </div>
    </div>
  ),
};

export const AllFeatures: Story = {
  render: () => (
    <div>
      <Topbar onMenu={() => alert("Menu opened")} />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Topbar Features</h1>
        <div className="space-y-4">
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold mb-2">🔍 Search</h3>
            <p className="text-sm">
              Full-width search bar on desktop, button on mobile with keyboard
              shortcut (⌘K)
            </p>
          </Card>
          <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
            <h3 className="font-semibold mb-2">🎨 Theme Toggle</h3>
            <p className="text-sm">
              Click the sun/moon icon to switch between light and dark modes
            </p>
          </Card>
          <Card className="p-4 bg-green-50 dark:bg-green-900/20">
            <h3 className="font-semibold mb-2">🔔 Notifications</h3>
            <p className="text-sm">
              Bell icon for accessing notifications (functionality not
              implemented in stories)
            </p>
          </Card>
          <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
            <h3 className="font-semibold mb-2">📱 Mobile Menu</h3>
            <p className="text-sm">
              Hamburger menu button visible on mobile to toggle sidebar
            </p>
          </Card>
          <Card className="p-4 bg-indigo-50 dark:bg-indigo-900/20">
            <h3 className="font-semibold mb-2">🏷️ Branding</h3>
            <p className="text-sm">
              Application logo and name with gradient styling
            </p>
          </Card>
        </div>
      </div>
    </div>
  ),
};
