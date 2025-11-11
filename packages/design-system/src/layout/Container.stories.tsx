/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A container component that constrains content width and provides horizontal padding.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "4xl", "7xl", "full"],
      description: "Maximum width of the container",
    },
    padding: {
      control: "select",
      options: [0, 2, 4, 6, 8],
      description: "Horizontal padding",
    },
    center: {
      control: "boolean",
      description: "Center the container horizontally",
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default container with 7xl max-width and medium padding.
 */
export const Default: Story = {
  args: {
    children: (
      <div className="h-64 bg-blue-500 rounded flex items-center justify-center text-white text-lg">
        Container Content (max-w-7xl)
      </div>
    ),
  },
};

/**
 * Centered container (most common use case).
 */
export const Centered: Story = {
  args: {
    center: true,
    children: (
      <div className="h-64 bg-green-500 rounded flex items-center justify-center text-white text-lg">
        Centered Container
      </div>
    ),
  },
};

/**
 * Various container sizes.
 */
export const Sizes: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-8 py-8">
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">Small (max-w-sm)</h3>
        <Container size="sm" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            Small Container
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">Medium (max-w-md)</h3>
        <Container size="md" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            Medium Container
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">Large (max-w-lg)</h3>
        <Container size="lg" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            Large Container
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">
          Extra Large (max-w-xl)
        </h3>
        <Container size="xl" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            XL Container
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">2XL (max-w-2xl)</h3>
        <Container size="2xl" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            2XL Container
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">4XL (max-w-4xl)</h3>
        <Container size="4xl" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            4XL Container
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">
          7XL (max-w-7xl) - Default
        </h3>
        <Container size="7xl" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            7XL Container
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">
          Full Width (max-w-full)
        </h3>
        <Container size="full" center>
          <div className="h-24 bg-purple-500 rounded flex items-center justify-center text-white">
            Full Width Container
          </div>
        </Container>
      </div>
    </div>
  ),
};

/**
 * Different padding options.
 */
export const PaddingVariations: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-8 py-8 bg-gray-100">
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">No Padding (px-0)</h3>
        <Container size="2xl" padding={0} center>
          <div className="h-16 bg-orange-500 flex items-center justify-center text-white">
            No padding - content touches edges
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">Small Padding (px-2)</h3>
        <Container size="2xl" padding={2} center>
          <div className="h-16 bg-orange-500 rounded flex items-center justify-center text-white">
            px-2
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">
          Default Padding (px-4)
        </h3>
        <Container size="2xl" padding={4} center>
          <div className="h-16 bg-orange-500 rounded flex items-center justify-center text-white">
            px-4 (default)
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">Large Padding (px-8)</h3>
        <Container size="2xl" padding={8} center>
          <div className="h-16 bg-orange-500 rounded flex items-center justify-center text-white">
            px-8
          </div>
        </Container>
      </div>
    </div>
  ),
};

/**
 * Typical page layout with header, main content, and footer.
 */
export const PageLayout: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <Container center>
          <div className="h-16 flex items-center justify-between">
            <div className="font-bold text-xl">Logo</div>
            <nav className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container center className="py-12">
        <h1 className="text-3xl font-bold mb-6">Page Title</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <p className="text-gray-600 mb-4">
            This is a typical page layout using the Container component. The
            container constrains the width and centers the content.
          </p>
          <p className="text-gray-600">
            The same Container component is used for the header, main content,
            and footer to maintain consistent alignment across all sections.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Feature 1</h3>
            <p className="text-sm text-gray-600">Description of feature one.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Feature 2</h3>
            <p className="text-sm text-gray-600">Description of feature two.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Feature 3</h3>
            <p className="text-sm text-gray-600">
              Description of feature three.
            </p>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <div className="bg-gray-900 text-white mt-12">
        <Container center className="py-8">
          <div className="text-center text-sm">
            &copy; 2024 Company Name. All rights reserved.
          </div>
        </Container>
      </div>
    </div>
  ),
};

/**
 * Narrow content container (good for articles/blog posts).
 */
export const ArticleLayout: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="bg-gray-50 py-12">
      <Container size="2xl" center>
        <article className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold mb-4">Article Title</h1>
          <p className="text-gray-600 mb-6">Published on January 1, 2024</p>
          <div className="prose max-w-none">
            <p className="mb-4">
              This is an example of using a narrower container (2xl) for article
              content. Narrower containers improve readability for long-form
              text content.
            </p>
            <p className="mb-4">
              The Container component makes it easy to constrain content width
              while maintaining consistent spacing and alignment throughout your
              application.
            </p>
            <p>
              You can combine Container with other layout primitives like Stack,
              Flex, and Grid to create complex, responsive layouts.
            </p>
          </div>
        </article>
      </Container>
    </div>
  ),
};

/**
 * Full-width container for dashboard layouts.
 */
export const FullWidth: Story = {
  args: {
    size: "full",
    children: (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Total Users</div>
            <div className="text-3xl font-bold">1,234</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Revenue</div>
            <div className="text-3xl font-bold">$45.6k</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Orders</div>
            <div className="text-3xl font-bold">567</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Conversion</div>
            <div className="text-3xl font-bold">3.2%</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="text-gray-600">Dashboard content goes here...</div>
        </div>
      </div>
    ),
  },
};
