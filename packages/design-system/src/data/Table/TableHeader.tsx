import React from "react";
import { clsx } from "clsx";
import { TableColumn } from "./types";
import {
  getBgColor,
  getBorderColor,
  getTextColor,
  getElevationClasses,
} from "../../theme";

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
  return (
    <thead>
      <tr
        className={clsx(
          getBgColor(undefined, true),
          getBorderColor(undefined, "bottom"),
          getElevationClasses("raised")
        )}
      >
        {columns.map((column) => (
          <th
            key={column.key}
            className={clsx(
              "text-center px-4 py-3 font-medium text-sm",
              getTextColor(undefined, true)
            )}
          >
            {column.header}
          </th>
        ))}
        {hasActions && (
          <th
            className={clsx(
              "text-center px-4 py-3 font-medium text-sm",
              getTextColor(undefined, true)
            )}
          >
            {actionsHeaderText}
          </th>
        )}
      </tr>
    </thead>
  );
};
