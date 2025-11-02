import React from "react";
import { Button } from "@nevo/design-system";

export interface ProductsActionsProps {
  onAdd?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
}

export function ProductsActions({
  onAdd,
  onExport,
  onSettings,
}: ProductsActionsProps) {
  return (
    <div className="flex gap-2">
      <Button intent="neutral" variant="ghost" onClick={onSettings}>
        Settings
      </Button>
      <Button variant="outline" onClick={onExport}>
        Export
      </Button>
      <Button intent="primary" variant="solid" onClick={onAdd}>
        Dodaj produkt
      </Button>
    </div>
  );
}
