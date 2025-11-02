import { ComponentIntent, ComponentVariant } from "../../theme";

export type CellRenderer<T = any> = (value: any, row: T) => React.ReactNode;

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor: keyof T | ((row: T) => any);
  render?: CellRenderer<T>;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

export interface TableAction<T = any> {
  icon: React.ReactNode;
  label: string;
  intent?: ComponentIntent;
  variant?: ComponentVariant;
  onClick?: (row: T) => void;
}

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
}

export interface TableSkeletonProps<T = any> {
  rows: number;
  columns: TableColumn<T>[];
  hasActions: boolean;
  actionsHeaderText?: string;
}