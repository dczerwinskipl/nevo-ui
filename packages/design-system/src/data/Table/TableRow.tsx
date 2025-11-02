import React, { useCallback } from 'react';
import { useTheme } from '../../theme';
import { TableColumn, TableAction } from './types';
import { TableActions } from './TableActions';

export interface TableRowProps<T> {
  row: T;
  index: number;
  columns: TableColumn<T>[];
  actions: TableAction<T>[];
  onRowClick?: (row: T) => void;
  onActionClick: (action: TableAction<T>, row: T) => void;
  keyExtractor: (row: T) => string | number;
}

/**
 * TableRow component renders a single table row with cells and actions.
 * Supports click handlers and proper cell value rendering.
 */
export const TableRow = <T,>({
  row,
  index,
  columns,
  actions,
  onRowClick,
  onActionClick,
  keyExtractor,
}: TableRowProps<T>): React.ReactElement => {
  const { tokens } = useTheme();

  const getCellValue = useCallback((row: T, column: TableColumn<T>) => {
    if (typeof column.accessor === 'function') {
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
    [getCellValue],
  );

  const handleRowClick = useCallback(() => {
    onRowClick?.(row);
  }, [onRowClick, row]);

  return (
    <tr
      key={keyExtractor(row)}
      className={`transition-all duration-200 hover:bg-opacity-50 ${
        onRowClick ? 'cursor-pointer' : ''
      }`}
      style={{
        borderBottom: `1px solid ${tokens.border}`,
        background: index % 2 === 0 ? 'transparent' : `${tokens.raised}10`,
      }}
      onClick={handleRowClick}
    >
      {columns.map((column) => (
        <td
          key={column.key}
          className="px-4 py-3"
          style={{
            color: tokens.text,
            textAlign: column.align || 'left',
          }}
        >
          {renderCell(row, column)}
        </td>
      ))}
      {actions.length > 0 && (
        <td className="px-4 py-3">
          <div className="flex justify-center">
            <TableActions
              actions={actions}
              row={row}
              onActionClick={onActionClick}
            />
          </div>
        </td>
      )}
    </tr>
  );
};
