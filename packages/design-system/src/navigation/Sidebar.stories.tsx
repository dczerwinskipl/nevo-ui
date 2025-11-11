import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { Typography } from "../primitives/Typography";

const meta: Meta<typeof Sidebar> = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sidebar navigation component with support for nested menu items, mobile overlay, and active state highlighting.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: function DefaultSidebar() {
    const [route, setRoute] = useState("dashboard");

    return (
      <div style={{ height: "600px", display: "flex" }}>
        <Sidebar route={route} onNavigate={setRoute} />
        <div className="flex-1 p-8">
          <Typography type="section-title" className="mb-4">
            Current Route: {route}
          </Typography>
          <Typography type="body" intent="neutral">
            Click on navigation items to change the active route.
          </Typography>
        </div>
      </div>
    );
  },
};

export const WithActiveChild: Story = {
  render: function ActiveChildSidebar() {
    const [route, setRoute] = useState("products-list");

    return (
      <div style={{ height: "600px", display: "flex" }}>
        <Sidebar route={route} onNavigate={setRoute} />
        <div className="flex-1 p-8">
          <Typography type="section-title" className="mb-4">
            Current Route: {route}
          </Typography>
          <Typography type="body" intent="neutral">
            The Products section is expanded with &quot;All Products&quot;
            active.
          </Typography>
        </div>
      </div>
    );
  },
};

export const MinimalNavigation: Story = {
  render: function MinimalSidebar() {
    const [route, setRoute] = useState("home");

    return (
      <div style={{ height: "600px", display: "flex" }}>
        <Sidebar route={route} onNavigate={setRoute} />
        <div className="flex-1 p-8">
          <Typography type="section-title" className="mb-4">
            Current Route: {route}
          </Typography>
          <Typography type="caption" intent="neutral">
            Minimal sidebar with 3 items.
          </Typography>
        </div>
      </div>
    );
  },
};

export const ExtendedNavigation: Story = {
  render: function ExtendedSidebar() {
    const [route, setRoute] = useState("dashboard");

    return (
      <div style={{ height: "600px", display: "flex" }}>
        <Sidebar route={route} onNavigate={setRoute} />
        <div className="flex-1 p-8">
          <Typography type="section-title" className="mb-4">
            Current Route: {route}
          </Typography>
          <Typography type="caption" intent="neutral">
            Extended navigation with many items and nested children.
          </Typography>
        </div>
      </div>
    );
  },
};

export const MobileOverlay: Story = {
  render: function MobileSidebar() {
    const [route, setRoute] = useState("dashboard");
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div style={{ height: "600px", display: "flex" }}>
        <Sidebar
          route={route}
          onNavigate={setRoute}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
        <div className="flex-1 p-8">
          <Button
            intent="primary"
            onClick={() => setIsOpen(true)}
            className="mb-4"
          >
            Open Mobile Sidebar
          </Button>
          <Typography type="section-title" className="mb-4">
            Current Route: {route}
          </Typography>
          <Typography type="caption" intent="neutral">
            This demonstrates the mobile overlay behavior. Click the button to
            open the sidebar.
          </Typography>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: function InteractiveSidebar() {
    const [route, setRoute] = useState("dashboard");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [clicks, setClicks] = useState(0);

    const handleNavigate = (key: string) => {
      setRoute(key);
      setClicks((prev) => prev + 1);
      setMobileOpen(false);
    };

    return (
      <div>
        <Card className="mb-4 p-4">
          <Typography type="body" className="mb-2">
            Navigation clicks: <strong>{clicks}</strong>
          </Typography>
          <Button
            intent="primary"
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
          >
            Open Mobile Menu
          </Button>
        </Card>
        <div style={{ height: "600px", display: "flex" }}>
          <Sidebar
            route={route}
            onNavigate={handleNavigate}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
          <div className="flex-1 p-8">
            <Typography type="section-title" className="mb-4">
              Current Route: {route}
            </Typography>
            <Typography type="caption" intent="neutral" className="mb-4">
              Try navigating to different sections and their children.
            </Typography>
            <div className="space-y-2">
              <Typography type="body">
                • Click parent items to expand/collapse children
              </Typography>
              <Typography type="body">
                • Click child items to navigate
              </Typography>
              <Typography type="body">
                • Active states are highlighted
              </Typography>
              <Typography type="body">
                • Mobile overlay works on small screens
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithContentArea: Story = {
  render: function SidebarWithContent() {
    const [route, setRoute] = useState("dashboard");

    const renderContent = () => {
      switch (route) {
        case "dashboard":
          return (
            <div>
              <Typography type="page-title" className="mb-4">
                Dashboard
              </Typography>
              <Typography type="body">Welcome to your dashboard!</Typography>
            </div>
          );
        case "products-list":
          return (
            <div>
              <Typography type="page-title" className="mb-4">
                All Products
              </Typography>
              <Typography type="body">
                View and manage all your products here.
              </Typography>
            </div>
          );
        case "orders-list":
          return (
            <div>
              <Typography type="page-title" className="mb-4">
                All Orders
              </Typography>
              <Typography type="body">View and manage all orders.</Typography>
            </div>
          );
        case "users":
          return (
            <div>
              <Typography type="page-title" className="mb-4">
                Users
              </Typography>
              <Typography type="body">
                Manage your users and permissions.
              </Typography>
            </div>
          );
        default:
          return (
            <div>
              <Typography type="page-title" className="mb-4">
                {route}
              </Typography>
              <Typography type="body">Content for {route}</Typography>
            </div>
          );
      }
    };

    return (
      <div style={{ height: "600px", display: "flex" }}>
        <Sidebar route={route} onNavigate={setRoute} />
        <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
      </div>
    );
  },
};
