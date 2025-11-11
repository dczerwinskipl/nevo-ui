import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

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
          <h1 className="text-2xl font-bold mb-4">Current Route: {route}</h1>
          <p className="text-gray-600">
            Click on navigation items to change the active route.
          </p>
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
          <h1 className="text-2xl font-bold mb-4">Current Route: {route}</h1>
          <p className="text-gray-600">
            The Products section is expanded with &quot;All Products&quot;
            active.
          </p>
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
          <h1 className="text-2xl font-bold mb-4">Current Route: {route}</h1>
          <p className="text-gray-600">Minimal sidebar with 3 items.</p>
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
          <h1 className="text-2xl font-bold mb-4">Current Route: {route}</h1>
          <p className="text-gray-600">
            Extended navigation with many items and nested children.
          </p>
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
          <button
            onClick={() => setIsOpen(true)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Mobile Sidebar
          </button>
          <h1 className="text-2xl font-bold mb-4">Current Route: {route}</h1>
          <p className="text-gray-600">
            This demonstrates the mobile overlay behavior. Click the button to
            open the sidebar.
          </p>
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
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm">
            Navigation clicks: <strong>{clicks}</strong>
          </p>
          <button
            onClick={() => setMobileOpen(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 md:hidden"
          >
            Open Mobile Menu
          </button>
        </div>
        <div style={{ height: "600px", display: "flex" }}>
          <Sidebar
            route={route}
            onNavigate={handleNavigate}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-4">Current Route: {route}</h1>
            <p className="text-gray-600 mb-4">
              Try navigating to different sections and their children.
            </p>
            <div className="space-y-2 text-sm">
              <p>• Click parent items to expand/collapse children</p>
              <p>• Click child items to navigate</p>
              <p>• Active states are highlighted</p>
              <p>• Mobile overlay works on small screens</p>
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
              <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
              <p>Welcome to your dashboard!</p>
            </div>
          );
        case "products-list":
          return (
            <div>
              <h1 className="text-3xl font-bold mb-4">All Products</h1>
              <p>View and manage all your products here.</p>
            </div>
          );
        case "orders-list":
          return (
            <div>
              <h1 className="text-3xl font-bold mb-4">All Orders</h1>
              <p>View and manage all orders.</p>
            </div>
          );
        case "users":
          return (
            <div>
              <h1 className="text-3xl font-bold mb-4">Users</h1>
              <p>Manage your users and permissions.</p>
            </div>
          );
        default:
          return (
            <div>
              <h1 className="text-3xl font-bold mb-4">{route}</h1>
              <p>Content for {route}</p>
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
