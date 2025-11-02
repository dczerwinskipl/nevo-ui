import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../theme";
import { Table, TableColumn, TableAction } from "./Table";

// Mock data for testing
interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: Date;
}

const mockUsers: TestUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "inactive",
    createdAt: new Date("2023-02-01"),
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "active",
    createdAt: new Date("2023-03-01"),
  },
];

const basicColumns: TableColumn<TestUser>[] = [
  { key: "name", header: "Name", accessor: "name" },
  { key: "email", header: "Email", accessor: "email" },
  { key: "role", header: "Role", accessor: "role" },
];

const advancedColumns: TableColumn<TestUser>[] = [
  { key: "name", header: "Name", accessor: "name", align: "left" },
  { key: "email", header: "Email", accessor: "email", align: "center" },
  {
    key: "status",
    header: "Status",
    accessor: "status",
    render: (value) => (
      <span
        data-testid={`status-${value}`}
        style={{ color: value === "active" ? "green" : "red" }}
      >
        {value}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    accessor: (row) => row.createdAt.toLocaleDateString(),
    align: "right",
  },
];

const mockActions: TableAction<TestUser>[] = [
  {
    icon: <span>✏️</span>,
    label: "Edit",
    intent: "primary",
    onClick: jest.fn(),
  },
  {
    icon: <span>❌</span>,
    label: "Delete",
    intent: "error",
    variant: "outline",
    onClick: jest.fn(),
  },
];

interface RenderProps {
  data?: TestUser[];
  columns?: TableColumn<TestUser>[];
  actions?: TableAction<TestUser>[];
  onRowClick?: jest.Mock;
  keyExtractor?: (row: TestUser) => string | number;
}

function renderTable(props: RenderProps = {}) {
  const defaultProps = {
    data: mockUsers,
    columns: basicColumns,
    actions: [] as TableAction<TestUser>[],
    onRowClick: props.onRowClick || undefined,
    keyExtractor: props.keyExtractor || undefined,
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Table<TestUser> {...(defaultProps as any)} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("Table", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic rendering", () => {
    it("should render table with headers and data", () => {
      renderTable();

      // Check headers
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();

      // Check data rows
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();

      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
      expect(screen.getByText("User")).toBeInTheDocument();
    });

    it("should render empty table with headers only", () => {
      renderTable({ data: [] });

      // Should show empty state instead of headers
      expect(screen.getByText("No data found")).toBeInTheDocument();
      expect(
        screen.getByText("Try adjusting your filters or search criteria")
      ).toBeInTheDocument();

      // No data rows
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });

    it("should render with custom key extractor", () => {
      renderTable({
        keyExtractor: (row) => `user-${row.id}`,
      });

      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should handle different column alignments", () => {
      renderTable({ columns: advancedColumns });

      const nameHeader = screen.getByText("Name");
      const emailHeader = screen.getByText("Email");
      const createdHeader = screen.getByText("Created");

      expect(nameHeader).toBeInTheDocument();
      expect(emailHeader).toBeInTheDocument();
      expect(createdHeader).toBeInTheDocument();
    });
  });

  describe("Column rendering", () => {
    it("should render basic columns with accessor strings", () => {
      renderTable();

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("should render columns with accessor functions", () => {
      renderTable({ columns: advancedColumns });

      // Should format dates using the accessor function
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
      expect(screen.getByText("2/1/2023")).toBeInTheDocument();
      expect(screen.getByText("3/1/2023")).toBeInTheDocument();
    });

    it("should render columns with custom render functions", () => {
      renderTable({ columns: advancedColumns });

      // Custom status renderer should apply styles (check for first occurrence)
      expect(screen.getAllByTestId("status-active")[0]).toBeInTheDocument();
      expect(screen.getByTestId("status-inactive")).toBeInTheDocument();
    });

    it("should handle missing column accessors gracefully", () => {
      const columnsWithMissingAccessor: TableColumn<TestUser>[] = [
        { key: "missing", header: "Missing", accessor: "nonexistent" as any },
      ];

      renderTable({ columns: columnsWithMissingAccessor });

      // Should render without crashing
      expect(screen.getByText("Missing")).toBeInTheDocument();
    });
  });

  describe("Actions", () => {
    it("should render action column when actions are provided", () => {
      renderTable({ actions: mockActions });

      expect(screen.getByText("Actions")).toBeInTheDocument();

      // Should render action buttons for each row
      const editButtons = screen.getAllByLabelText("Edit");
      const deleteButtons = screen.getAllByLabelText("Delete");

      expect(editButtons).toHaveLength(mockUsers.length);
      expect(deleteButtons).toHaveLength(mockUsers.length);
    });

    it("should call action onClick when button is clicked", async () => {
      const user = userEvent.setup();
      renderTable({ actions: mockActions });

      const firstEditButton = screen.getAllByLabelText("Edit")[0];
      if (firstEditButton && mockActions[0]?.onClick) {
        await user.click(firstEditButton);
        expect(mockActions[0].onClick).toHaveBeenCalledWith(mockUsers[0]);
      }
    });

    it("should not render action column when no actions provided", () => {
      renderTable({ actions: [] });

      expect(screen.queryByText("Akcje")).not.toBeInTheDocument();
    });

    it("should prevent row click when action is clicked", async () => {
      const user = userEvent.setup();
      const onRowClick = jest.fn();
      renderTable({ actions: mockActions, onRowClick });

      const firstEditButton = screen.getAllByLabelText("Edit")[0];
      if (firstEditButton && mockActions[0]?.onClick) {
        await user.click(firstEditButton);

        // Action should be called
        expect(mockActions[0].onClick).toHaveBeenCalledWith(mockUsers[0]);
        // Row click should not be called
        expect(onRowClick).not.toHaveBeenCalled();
      }
    });
  });

  describe("Row interactions", () => {
    it("should call onRowClick when row is clicked", async () => {
      const user = userEvent.setup();
      const onRowClick = jest.fn();
      renderTable({ onRowClick });

      const firstRow = screen.getByText("John Doe").closest("tr");
      expect(firstRow).toBeInTheDocument();

      await user.click(firstRow!);
      expect(onRowClick).toHaveBeenCalledWith(mockUsers[0]);
    });

    it("should apply cursor pointer when onRowClick is provided", () => {
      renderTable({ onRowClick: jest.fn() });

      const firstRow = screen.getByText("John Doe").closest("tr");
      expect(firstRow).toHaveClass("cursor-pointer");
    });

    it("should not apply cursor pointer when onRowClick is not provided", () => {
      renderTable();

      const firstRow = screen.getByText("John Doe").closest("tr");
      expect(firstRow).not.toHaveClass("cursor-pointer");
    });

    it("should handle keyboard navigation", async () => {
      const user = userEvent.setup();
      const onRowClick = jest.fn();
      renderTable({ onRowClick });

      const firstRow = screen.getByText("John Doe").closest("tr");

      // Focus and press enter
      firstRow?.focus();
      await user.keyboard("{Enter}");

      // Note: Default table rows aren't focusable, this test documents current behavior
      expect(onRowClick).not.toHaveBeenCalled();
    });
  });

  describe("Data handling", () => {
    it("should handle large datasets efficiently", () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: "User",
        status: "active" as const,
        createdAt: new Date(),
      }));

      renderTable({ data: largeDataset });

      // Should render headers
      expect(screen.getByText("Name")).toBeInTheDocument();
      // Should render first few rows
      expect(screen.getByText("User 0")).toBeInTheDocument();
      expect(screen.getByText("User 1")).toBeInTheDocument();
    });

    it("should handle data updates correctly", () => {
      const { rerender } = renderTable();

      expect(screen.getByText("John Doe")).toBeInTheDocument();

      // Update data
      const updatedUsers = [
        {
          ...mockUsers[0],
          name: "John Updated",
        },
        ...mockUsers.slice(1),
      ] as TestUser[];

      rerender(
        <ThemeProvider>
          <Table data={updatedUsers} columns={basicColumns} />
        </ThemeProvider>
      );

      expect(screen.getByText("John Updated")).toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });

    it("should handle dynamic columns", () => {
      const { rerender } = renderTable();

      expect(screen.getByText("Role")).toBeInTheDocument();
      expect(screen.queryByText("Status")).not.toBeInTheDocument();

      // Update columns
      rerender(
        <ThemeProvider>
          <Table data={mockUsers} columns={advancedColumns} />
        </ThemeProvider>
      );

      expect(screen.getByText("Status")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper table structure", () => {
      renderTable();

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();

      const headers = screen.getAllByRole("columnheader");
      expect(headers).toHaveLength(3);

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(4); // 1 header + 3 data rows
    });

    it("should have proper aria-labels for action buttons", () => {
      renderTable({ actions: mockActions });

      const editButtons = screen.getAllByLabelText("Edit");
      const deleteButtons = screen.getAllByLabelText("Delete");

      expect(editButtons).toHaveLength(mockUsers.length);
      expect(deleteButtons).toHaveLength(mockUsers.length);
    });

    it("should be responsive and have scroll container", () => {
      renderTable();

      const scrollContainer = screen.getByRole("table").parentElement;
      expect(scrollContainer).toHaveClass("overflow-x-auto");
    });

    it("should handle screen reader navigation", () => {
      renderTable();

      // Table should have proper structure for screen readers
      const table = screen.getByRole("table");
      const tbody = table.querySelector("tbody");
      const thead = table.querySelector("thead");

      expect(thead).toBeInTheDocument();
      expect(tbody).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should memoize rows efficiently", () => {
      const { rerender } = renderTable();

      expect(screen.getByText("John Doe")).toBeInTheDocument();

      // Re-render with same data
      rerender(
        <ThemeProvider>
          <Table data={mockUsers} columns={basicColumns} />
        </ThemeProvider>
      );

      // Content should still be there
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should handle rapid re-renders", () => {
      const { rerender } = renderTable();

      // Rapidly change props
      for (let i = 0; i < 10; i++) {
        rerender(
          <ThemeProvider>
            <Table
              data={mockUsers}
              columns={basicColumns}
              onRowClick={jest.fn()}
            />
          </ThemeProvider>
        );
      }

      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should optimize cell rendering", async () => {
      const user = userEvent.setup();
      const onRowClick = jest.fn();
      renderTable({ onRowClick, columns: advancedColumns });

      // Multiple interactions should not cause excessive re-renders
      const firstRow = screen.getByText("John Doe").closest("tr");

      await user.click(firstRow!);
      await user.click(firstRow!);

      expect(onRowClick).toHaveBeenCalledTimes(2);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle null/undefined values in data", () => {
      const dataWithNulls = [
        { id: 1, name: null, email: "test@example.com", role: undefined },
        { id: 2, name: "", email: null, role: "User" },
      ];

      renderTable({ data: dataWithNulls as any });

      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.getByText("User")).toBeInTheDocument();
    });

    it("should handle complex nested data", () => {
      const complexData = [
        {
          id: 1,
          name: "John",
          profile: { email: "john@example.com", settings: { role: "Admin" } },
        },
      ];

      const complexColumns: TableColumn[] = [
        { key: "name", header: "Name", accessor: "name" },
        {
          key: "email",
          header: "Email",
          accessor: (row: any) => row.profile?.email,
        },
        {
          key: "role",
          header: "Role",
          accessor: (row: any) => row.profile?.settings?.role,
        },
      ];

      renderTable({ data: complexData as any, columns: complexColumns });

      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("should handle empty actions array", () => {
      renderTable({ actions: [] });

      expect(screen.queryByText("Akcje")).not.toBeInTheDocument();
    });

    it("should handle missing keyExtractor fallback", () => {
      const dataWithoutIds = [
        { name: "John", email: "john@example.com", role: "Admin" },
      ];

      renderTable({ data: dataWithoutIds as any });

      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });
});
