import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { EmptyState, ErrorState } from "../../feedback";
import { TableSkeleton } from "./TableSkeleton";
import { LoadingOverlay } from "./LoadingOverlay";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableProps, TableAction } from "./types";

/**
 * Generic Table component with built-in loading, empty, and error states.
 * Supports data persistence during loading for smooth UX during filter operations.
 */
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
}: TableProps<T>): React.ReactElement => {
  const { tokens } = useTheme();
  const [snapshotData, setSnapshotData] = useState<T[]>([]);
  const [prevIsLoading, setPrevIsLoading] = useState(isLoading);

  // Capture data snapshot when isLoading changes from true to false
  useEffect(() => {
    if (!isLoading && prevIsLoading) {
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
        tokens={tokens}
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
        className="w-full text-sm min-w-[600px] md:min-w-full"
        style={{ color: tokens.text }}
      >
        <TableHeader
          columns={columns}
          hasActions={actions.length > 0}
          tokens={tokens}
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
              tokens={tokens}
              keyExtractor={keyExtractor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );

  // Show overlay when loading and we have snapshot data (not initial load)
  if (isLoading && snapshotData.length > 0) {
    return (
      <LoadingOverlay message={fetchingMessage} tokens={tokens}>
        {tableContent}
      </LoadingOverlay>
    );
  }

  return tableContent;
};
