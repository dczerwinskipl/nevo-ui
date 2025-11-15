import React, { useMemo, useState, useEffect } from "react";
import { clsx } from "clsx";
import { EmptyState, ErrorState } from "../../feedback";
import { Pagination } from "../Pagination";
import { TableSkeleton } from "./TableSkeleton";
import { LoadingOverlay } from "./LoadingOverlay";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableProps, TableAction } from "./types";
import { getTextColor } from "../../theme";

/**
 * Generic Table component with built-in loading, empty, error states, and optional pagination.
 * Supports data persistence during loading for smooth UX during filter operations.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  onRowClick,
  keyExtractor = (row) => row.id || row.key || JSON.stringify(row),
  isLoading = false,
  error,
  onRetry,
  skeletonRows = 5,
  emptyTitle = "No data found",
  emptyDescription = "Try adjusting your filters or search criteria",
  fetchingMessage = "Updating...",
  emptyIcon,
  actionsHeaderText = "Actions",
  pagination,
}: TableProps<T>): React.ReactElement => {
  const [snapshotData, setSnapshotData] = useState<T[]>([]);
  const [prevIsLoading, setPrevIsLoading] = useState(isLoading);

  // Capture data snapshot when isLoading changes from true to false
  useEffect(() => {
    if ((!isLoading && prevIsLoading) || data?.length > 0) {
      // Store current data after finishing loading data
      setSnapshotData(data || []);
    }
    setPrevIsLoading(isLoading);
  }, [isLoading, prevIsLoading, data]);

  const handleActionClick = (action: TableAction<T>, row: T) => {
    action.onClick?.(row);
  };

  // Determine which data to display
  const displayData = useMemo(() => {
    if (isLoading && snapshotData.length > 0) {
      return snapshotData;
    }
    return data || [];
  }, [data, snapshotData, isLoading]);

  const memoizedRows = useMemo(() => {
    return displayData.map((row: T, index: number) => ({
      key: keyExtractor(row),
      row,
      index,
    }));
  }, [displayData, keyExtractor]);

  // Handle error state
  if (error) {
    return <ErrorState error={error} {...(onRetry && { onRetry })} />;
  }

  // Handle initial loading state (no data in snapshot)
  if (isLoading && snapshotData.length === 0) {
    return (
      <TableSkeleton
        rows={skeletonRows}
        columns={columns}
        hasActions={actions.length > 0}
        actionsHeaderText={actionsHeaderText}
      />
    );
  }

  // Handle empty state (loaded but no data)
  if (!isLoading && (!data || data.length === 0)) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
      />
    );
  }

  const tableContent = (
    <div className="overflow-x-auto custom-scrollbar">
      <table
        className={clsx(
          "w-full text-sm min-w-[600px] md:min-w-full",
          getTextColor()
        )}
      >
        <TableHeader
          columns={columns}
          hasActions={actions.length > 0}
          actionsHeaderText={actionsHeaderText}
        />
        <tbody>
          {memoizedRows.map(({ key, row, index }) => (
            <TableRow
              key={key}
              row={row}
              index={index}
              columns={columns}
              actions={actions}
              {...(onRowClick && { onRowClick })}
              onActionClick={handleActionClick}
              keyExtractor={keyExtractor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );

  // Wrap table with pagination if provided
  const tableWithPagination = (
    <>
      {tableContent}
      {pagination && (
        <Pagination
          mode={pagination.mode ?? "pages"}
          disabled={pagination.disabled ?? isLoading}
          {...pagination}
        />
      )}
    </>
  );

  // Show overlay when loading and we have snapshot data (not initial load)
  if (isLoading && snapshotData.length > 0) {
    return (
      <LoadingOverlay message={fetchingMessage}>
        {tableWithPagination}
      </LoadingOverlay>
    );
  }

  return tableWithPagination;
};
