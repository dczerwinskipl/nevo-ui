import React from "react";
import { clsx } from "clsx";
import { TableSkeletonProps } from "./types";
import { TableHeader } from "./TableHeader";
import { getBorderColor, getCommonPattern } from "../../theme";

/**
 * TableSkeleton component displays a skeleton loading state that matches
 * the exact structure of the actual table including headers and actions.
 */
export const TableSkeleton = <T,>({
  rows,
  columns,
  hasActions,
  actionsHeaderText = "Actions",
}: TableSkeletonProps<T>) => {
  const SkeletonRow = ({
    column,
  }: {
    column: { align?: "left" | "center" | "right" };
  }) => (
    <td
      className={clsx(
        "px-4 py-3",
        column.align === "center" && "text-center",
        column.align === "right" && "text-right"
      )}
    >
      <div
        className={clsx(
          getCommonPattern("pulse"),
          "rounded h-4 bg-raised"
        )}
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
              className={clsx(
                getBorderColor(undefined, "bottom"),
                rowIndex % 2 !== 0 &&
                  "bg-[color-mix(in_srgb,_var(--color-raised)_10%,_transparent)]"
              )}
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
                          className={clsx(
                            getCommonPattern("pulse"),
                            "rounded w-8 h-8 bg-raised"
                          )}
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
