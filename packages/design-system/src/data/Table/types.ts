import { ComponentIntent, ComponentVariant } from "../../theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellRenderer<T = any> = (value: any, row: T) => React.ReactNode;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableColumn<T = any> {
  key: string;
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessor: keyof T | ((row: T) => any);
  render?: CellRenderer<T>;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableAction<T = any> {
  icon: React.ReactNode;
  label: string;
  intent?: ComponentIntent;
  variant?: ComponentVariant;
  onClick?: (row: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  onRowClick?: (row: T) => void;
  keyExtractor?: (row: T) => string | number;
  // Loading states
  isLoading?: boolean;
  error?: Error | null | undefined;
  onRetry?: (() => void) | undefined;
  // Skeleton options
  skeletonRows?: number;
  // Messages and text labels
  emptyTitle?: string;
  emptyDescription?: string;
  fetchingMessage?: string;
  emptyIcon?: React.ReactNode;
  actionsHeaderText?: string;
}

export interface LoadingOverlayProps {
  message: string;
  children: React.ReactNode;
  headerOffset?: number; // Offset from top to avoid covering headers (default: 50px)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableSkeletonProps<T = any> {
  rows: number;
  columns: TableColumn<T>[];
  hasActions: boolean;
  actionsHeaderText?: string;
}
