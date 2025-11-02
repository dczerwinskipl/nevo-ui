import React from 'react';
import { useTheme } from '../../theme';
import { TableSkeletonProps } from './types';
import { TableHeader } from './TableHeader';

/**
 * TableSkeleton component displays a skeleton loading state that matches
 * the exact structure of the actual table including headers and actions.
 */
export const TableSkeleton = <T,>({
  rows,
  columns,
  hasActions,
  actionsHeaderText = 'Actions',
}: TableSkeletonProps<T>) => {
  const { tokens } = useTheme();
  const SkeletonRow = ({
    column,
  }: {
    column: { align?: 'left' | 'center' | 'right' };
  }) => (
    <td className="px-4 py-3" style={{ textAlign: column.align || 'left' }}>
      <div
        className="animate-pulse rounded"
        style={{
          height: '16px',
          backgroundColor: tokens.border,
        }}
      />
    </td>
  );

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-sm min-w-[600px] md:min-w-full">
        <TableHeader
          columns={columns}
          hasActions={hasActions}
          actionsHeaderText={actionsHeaderText}
        />
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                borderBottom: `1px solid ${tokens.border}`,
                background:
                  rowIndex % 2 === 0 ? 'transparent' : `${tokens.raised}10`,
              }}
            >
              {columns.map((column) => (
                <SkeletonRow key={column.key} column={column} />
              ))}
              {hasActions && (
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="animate-pulse rounded"
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: tokens.border,
                          }}
                        />
                      ))}
                    </div>
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
