import { useCallback, useMemo, useState } from 'react';

export type FilterValue = string | number | '' | undefined;

export interface BaseFilterFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'select' | 'number';
  placeholder?: string;
  options?: Array<{ label: string; value: string | number }>;
  min?: number;
  max?: number;
  disabled?: boolean;
  isError?: boolean;
}

export type FilterConfig<TFilters extends Record<string, FilterValue>> = Record<keyof TFilters, BaseFilterFieldConfig>;

export function useFilters<TFilters extends Record<string, FilterValue>>(initialFilters: TFilters, config: FilterConfig<TFilters>) {
  const [pending, setPending] = useState<TFilters>(initialFilters);
  const [applied, setApplied] = useState<TFilters>(initialFilters);

  const updateFilter = useCallback(<K extends keyof TFilters>(key: K, value: TFilters[K]) => {
    setPending((p) => ({ ...p, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setPending(initialFilters);
    setApplied(initialFilters);
  }, [initialFilters]);

  const applyFilters = useCallback(() => {
    setApplied(pending);
  }, [pending]);

  const isDirty = useMemo(() => {
    // Check all config keys - config should contain all filter keys
    const allKeys = Object.keys(config) as Array<keyof TFilters>;
    const dirty = allKeys.some((k) => {
      const pendingValue = pending[k];
      const appliedValue = applied[k];
      // Consider undefined and empty string as equivalent for dirty detection
      const normalizedPending = pendingValue === "" ? undefined : pendingValue;
      const normalizedApplied = appliedValue === "" ? undefined : appliedValue;
      const isDifferent = normalizedPending !== normalizedApplied;
      
      return isDifferent;
    });
    
    return dirty;
  }, [pending, applied, config]);

  // Check if there are any applied filters (different from initial)
  const hasAppliedFilters = useMemo(() => {
    return (Object.keys(config) as Array<keyof TFilters>).some((k) => {
      const appliedValue = applied[k];
      const initialValue = initialFilters[k];
      // Consider undefined and empty string as equivalent
      const normalizedApplied = appliedValue === "" ? undefined : appliedValue;
      const normalizedInitial = initialValue === "" ? undefined : initialValue;
      return normalizedApplied !== normalizedInitial;
    });
  }, [applied, initialFilters, config]);

  const pendingFilters = pending;

  const fieldErrors = useMemo(() => {
    const errors: Partial<Record<keyof TFilters, boolean>> = {};
    (Object.keys(config) as Array<keyof TFilters>).forEach((key) => {
      const c = config[key];
      if (c?.isError) errors[key] = true;
    });
    return errors;
  }, [config]);

  return {
    filters: applied as TFilters,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
    fieldErrors,
  } as const;
}

export default useFilters;
