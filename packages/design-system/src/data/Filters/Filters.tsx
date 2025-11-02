import React from "react";
import { FilterGroup } from "./FilterGroup";
import { FormField } from "../../forms/FormField";
import { Input } from "../../primitives/Input";
import { Select } from "../../primitives/Select";
import { FilterActions } from "./FilterActions";
import type { FilterConfig, FilterValue } from "../types";

interface FiltersProps<TFilters extends Record<string, FilterValue>> {
  filters: Partial<TFilters>;
  config: FilterConfig<TFilters>;
  onUpdateFilter: <K extends keyof TFilters>(
    key: K,
    value: TFilters[K]
  ) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isDirty?: boolean;
  hasAppliedFilters?: boolean;
  applyLabel?: string;
  clearLabel?: string;
}

export function Filters<TFilters extends Record<string, FilterValue>>({
  filters,
  config,
  onUpdateFilter,
  onApplyFilters,
  onClearFilters,
  isFetching = false,
  isDirty = false,
  hasAppliedFilters = false,
  applyLabel = "Apply",
  clearLabel = "Clear",
}: FiltersProps<TFilters>) {
  const renderField = (key: keyof TFilters) => {
    const fieldConfig = config[key];
    if (!fieldConfig) return null;

    const value = filters[key];

    switch (fieldConfig.type) {
      case "text":
        return (
          <Input
            value={(value as string) || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUpdateFilter(key, e.target.value as TFilters[keyof TFilters])
            }
            placeholder={fieldConfig.placeholder || ""}
            size="sm"
            intent="neutral"
          />
        );

      case "select":
        return (
          <Select
            value={(value as string) || ""}
            onChange={(v: string | number) =>
              onUpdateFilter(key, v as TFilters[keyof TFilters])
            }
            options={fieldConfig.options || []}
            placeholder={fieldConfig.placeholder || "Select..."}
            size="sm"
            intent="neutral"
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={value !== undefined ? String(value) : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const v =
                e.target.value === "" ? undefined : Number(e.target.value);
              onUpdateFilter(key, v as TFilters[keyof TFilters]);
            }}
            placeholder={fieldConfig.placeholder || ""}
            {...(fieldConfig.min !== undefined && { min: fieldConfig.min })}
            {...(fieldConfig.max !== undefined && { max: fieldConfig.max })}
            size="sm"
            intent="neutral"
          />
        );

      default:
        return null;
    }
  };

  return (
    <FilterGroup>
      {(Object.keys(config) as Array<keyof TFilters>).map((key) => {
        const fieldConfig = config[key];
        if (!fieldConfig) return null;

        return (
          <FormField key={String(key)} label={fieldConfig.label}>
            {renderField(key)}
          </FormField>
        );
      })}

      <div className="col-span-full flex justify-end">
        <FilterActions
          onApply={onApplyFilters}
          onClear={onClearFilters}
          isLoading={isFetching}
          disabled={!isDirty}
          clearDisabled={!hasAppliedFilters}
          applyLabel={applyLabel}
          clearLabel={clearLabel}
        />
      </div>
    </FilterGroup>
  );
}

export default Filters;
