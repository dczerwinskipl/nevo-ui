import React from "react";
import { FilterGroup } from "./FilterGroup";
import { FormField } from "../forms/FormField";
import { TextFilter } from "./TextFilter";
import { SelectFilter } from "./SelectFilter";
import { NumberFilter } from "./NumberFilter";
import { FilterActions } from "./FilterActions";
import type { FilterConfig, FilterValue } from "./types";

interface FiltersFormProps<TFilters extends Record<string, FilterValue>> {
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

export function FiltersForm<TFilters extends Record<string, FilterValue>>({
  filters,
  config,
  onUpdateFilter,
  onApplyFilters,
  onClearFilters,
  isLoading = false,
  isFetching = false,
  isDirty = false,
  hasAppliedFilters = false,
  applyLabel = "Apply",
  clearLabel = "Clear",
}: FiltersFormProps<TFilters>) {
  const renderField = (key: keyof TFilters) => {
    const fieldConfig = config[key];
    if (!fieldConfig) return null;

    const value = filters[key];

    switch (fieldConfig.type) {
      case "text":
        return (
          <TextFilter
            value={value as string}
            onChange={(v) => onUpdateFilter(key, v as TFilters[keyof TFilters])}
            placeholder={fieldConfig.placeholder || ""}
            size="sm"
          />
        );

      case "select":
        return (
          <SelectFilter
            value={value as string}
            onChange={(v) => onUpdateFilter(key, v as TFilters[keyof TFilters])}
            options={fieldConfig.options || []}
            placeholder={fieldConfig.placeholder || "Select..."}
            size="sm"
          />
        );

      case "number":
        return (
          <NumberFilter
            value={typeof value === "number" ? value : undefined}
            onChange={(v) => onUpdateFilter(key, v as TFilters[keyof TFilters])}
            placeholder={fieldConfig.placeholder || ""}
            {...(fieldConfig.min !== undefined && { min: fieldConfig.min })}
            {...(fieldConfig.max !== undefined && { max: fieldConfig.max })}
            size="sm"
          />
        );

      default:
        return null;
    }
  };

  return (
    <FilterGroup>
      {Object.keys(config).map((key) => {
        const fieldConfig = config[key];
        if (!fieldConfig) return null;

        return (
          <FormField key={key} label={fieldConfig.label}>
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

export default FiltersForm;
