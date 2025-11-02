import React, { useCallback } from 'react';
import { Button } from '../../primitives/Button';
import { TableAction } from './types';

export interface TableActionsProps<T> {
  actions: TableAction<T>[];
  row: T;
  onActionClick: (action: TableAction<T>, row: T) => void;
}

/**
 * TableActions component renders action buttons for a table row.
 * Handles click events and prevents event propagation to avoid triggering row clicks.
 */
export const TableActions = <T,>({
  actions,
  row,
  onActionClick,
}: TableActionsProps<T>): React.ReactElement | null => {
  const handleActionClick = useCallback(
    (e: React.MouseEvent, action: TableAction<T>) => {
      e.stopPropagation();
      onActionClick(action, row);
    },
    [onActionClick, row],
  );

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {actions.map((action, actionIndex) => (
        <Button
          key={actionIndex}
          intent={action.intent || 'neutral'}
          variant={action.variant || 'ghost'}
          size="sm"
          aria-label={action.label}
          onClick={(e) => handleActionClick(e, action)}
        >
          {action.icon}
        </Button>
      ))}
    </div>
  );
};
