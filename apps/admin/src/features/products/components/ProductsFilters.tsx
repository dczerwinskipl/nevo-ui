import React from "react";
import { Card, Button, Input, Select } from "@nevo/design-system";

export interface ProductsFiltersProps {
  onFilter?: () => void;
}

export function ProductsFilters({ onFilter }: ProductsFiltersProps) {
  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div>
          <Input label="Szukaj" placeholder="Nazwa, SKU..." size="sm" />
        </div>
        <div>
          <Select
            label="Kategoria"
            options={[{ label: "Audio", value: "audio" }]}
            size="sm"
          />
        </div>
        <div>
          <Select
            label="Status"
            options={[{ label: "W drodze", value: "shipping" }]}
            size="sm"
          />
        </div>
        <div className="flex flex-col justify-end gap-1 text-sm">
          <Button
            intent="primary"
            variant="solid"
            size="sm"
            className="w-full"
            onClick={onFilter}
          >
            Zastosuj
          </Button>
        </div>
      </div>
    </Card>
  );
}
