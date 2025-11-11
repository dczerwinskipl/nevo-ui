import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Card } from "../primitives/Card";
import {
  Package,
  ShoppingCart,
  Search,
  Inbox,
  FileQuestion,
  Users,
} from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "EmptyState component displays when no data is available. Used across the application for consistent empty state UX.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the empty state",
    },
    description: {
      control: "text",
      description: "Description text explaining the empty state",
    },
    icon: {
      control: false,
      description: "Optional icon to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "There are no items to display at this time.",
  },
};

export const WithIcon: Story = {
  args: {
    title: "No products found",
    description: "Get started by adding your first product.",
    icon: <Package className="w-12 h-12" />,
  },
};

export const NoProducts: Story = {
  args: {
    title: "No products yet",
    description:
      "You haven't added any products yet. Create your first product to get started.",
    icon: <Package className="w-12 h-12" />,
  },
};

export const NoOrders: Story = {
  args: {
    title: "No orders found",
    description:
      "There are no orders matching your criteria. Try adjusting your filters.",
    icon: <ShoppingCart className="w-12 h-12" />,
  },
};

export const NoSearchResults: Story = {
  args: {
    title: "No results found",
    description:
      "We couldn't find any matches for your search. Try different keywords or check for typos.",
    icon: <Search className="w-12 h-12" />,
  },
};

export const EmptyInbox: Story = {
  args: {
    title: "Inbox is empty",
    description: "You're all caught up! No new messages or notifications.",
    icon: <Inbox className="w-12 h-12" />,
  },
};

export const NoUsers: Story = {
  args: {
    title: "No users found",
    description:
      "There are no users in this workspace. Invite team members to get started.",
    icon: <Users className="w-12 h-12" />,
  },
};

export const NotFound: Story = {
  args: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    icon: <FileQuestion className="w-12 h-12" />,
  },
};

export const LongDescription: Story = {
  args: {
    title: "No data available",
    description:
      "We don't have any data to show right now. This could be because you haven't created any items yet, or the data is still loading. If you think this is an error, please try refreshing the page or contact support for assistance.",
    icon: <Package className="w-12 h-12" />,
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "Nothing to see here",
    description: "Move along, there's nothing to display.",
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <Card className="p-4">
        <EmptyState
          title="No products yet"
          description="You haven't added any products yet."
          icon={<Package className="w-12 h-12" />}
        />
      </Card>
      <Card className="p-4">
        <EmptyState
          title="No orders found"
          description="There are no orders matching your criteria."
          icon={<ShoppingCart className="w-12 h-12" />}
        />
      </Card>
      <Card className="p-4">
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters."
          icon={<Search className="w-12 h-12" />}
        />
      </Card>
    </div>
  ),
};

export const InContainer: Story = {
  render: () => (
    <Card style={{ minHeight: "400px" }}>
      <div className="flex items-center h-full">
        <EmptyState
          title="No items in your cart"
          description="Add some products to your cart to get started with your order."
          icon={<ShoppingCart className="w-12 h-12" />}
        />
      </div>
    </Card>
  ),
};

export const CompactLayout: Story = {
  render: () => (
    <Card className="p-2">
      <EmptyState
        title="No data"
        description="Nothing to display."
        icon={<Inbox className="w-8 h-8" />}
      />
    </Card>
  ),
};
