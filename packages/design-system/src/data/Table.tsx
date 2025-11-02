import React, { useCallback, useMemo } from "react";
import {
  useTheme,
  ComponentIntent,
  ComponentVariant,
  raisedStyle,
} from "../theme/ThemeProvider";
import { Badge, BadgeIntent } from "../primitives/Badge";
import { Button } from "../primitives/Button";

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
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  onRowClick,
  keyExtractor = (row) => row.id || row.key || JSON.stringify(row),
}: TableProps<T>): React.ReactElement => {
  const { tokens } = useTheme();

  const getCellValue = useCallback((row: T, column: TableColumn<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return row[column.accessor];
  }, []);

  const renderCell = useCallback(
    (row: T, column: TableColumn<T>) => {
      const value = getCellValue(row, column);

      if (column.render) {
        return column.render(value, row);
      }

      return value;
    },
    [getCellValue]
  );

  const memoizedRows = useMemo(() => {
    return data.map((row, index) => ({
      key: keyExtractor(row),
      row,
      index,
    }));
  }, [data, keyExtractor]);

  const handleRowClick = useCallback(
    (row: T) => {
      onRowClick?.(row);
    },
    [onRowClick]
  );

  const handleActionClick = useCallback((action: TableAction<T>, row: T) => {
    action.onClick?.(row);
  }, []);

  return (
    <div className="overflow-x-auto custom-scrollbar">
      {/* Mobile-first responsive table */}
      <table
        className="w-full text-sm min-w-[600px] md:min-w-full"
        style={{ color: tokens.text }}
      >
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
                className="text-left px-4 py-3 font-medium text-sm"
                style={{
                  color: tokens.muted,
                  textAlign: column.align || "left",
                }}
              >
                {column.header}
              </th>
            ))}
            {actions.length > 0 && (
              <th
                className="text-left px-4 py-3 font-medium text-sm"
                style={{ color: tokens.muted }}
              >
                Akcje
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {memoizedRows.map(({ key, row, index }) => (
            <tr
              key={key}
              className={`transition-all duration-200 hover:bg-opacity-50 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
              style={{
                borderBottom: `1px solid ${tokens.border}`,
                background:
                  index % 2 === 0 ? "transparent" : `${tokens.raised}10`,
              }}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3"
                  style={{
                    color: tokens.text,
                    textAlign: column.align || "left",
                  }}
                >
                  {renderCell(row, column)}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        intent={action.intent || "neutral"}
                        variant={action.variant || "ghost"}
                        size="sm"
                        aria-label={action.label}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(action, row);
                        }}
                      >
                        {action.icon}
                      </Button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
