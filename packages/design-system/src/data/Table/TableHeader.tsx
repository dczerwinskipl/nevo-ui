import React from "react";
import { useTheme, raisedStyle } from "../../theme";
import { TableColumn } from "./types";

export interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  hasActions: boolean;
  actionsHeaderText?: string;
}

/**
 * TableHeader component renders the table header with column titles.
 * Supports custom text for the actions column.
 */
export const TableHeader = <T,>({
  columns,
  hasActions,
  actionsHeaderText = "Actions",
}: TableHeaderProps<T>): React.ReactElement => {
  const { tokens } = useTheme();

  return (
    <thead>
      <tr
        style={{
          ...raisedStyle(tokens),
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        {columns.map((column) => (
          <th
            key={column.key}
            className="text-center px-4 py-3 font-medium text-sm"
            style={{
              color: tokens.muted,
            }}
          >
            {column.header}
          </th>
        ))}
        {hasActions && (
          <th
            className="text-center px-4 py-3 font-medium text-sm"
            style={{ color: tokens.muted }}
          >
            {actionsHeaderText}
          </th>
        )}
      </tr>
    </thead>
  );
};
