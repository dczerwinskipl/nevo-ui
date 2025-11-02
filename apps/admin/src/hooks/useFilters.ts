import { useCallback, useMemo, useState } from 'react';

export type FilterValue = string | number | '';

export type InferFilterType<T> = T extends string ? 'text' | 'select' : T extends number ? 'number' | 'select' : never;

export type FilterConfig<TFilters extends Record<string, FilterValue>> = {
  [K in keyof TFilters]: {
    name: K;
    label: string;
    type: InferFilterType<TFilters[K]>;
    placeholder?: string;
    options?: TFilters[K] extends string ? Array<{ label: string; value: TFilters[K] }> : never;
    min?: TFilters[K] extends number ? number : never;
    max?: TFilters[K] extends number ? number : never;
    disabled?: boolean;
    isError?: boolean;
  };
};

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
    return Object.keys(initialFilters).some((k) => (pending as any)[k] !== (applied as any)[k]);
  }, [pending, applied, initialFilters]);

  const pendingFilters = pending;

  const fieldErrors = useMemo(() => {
    const errors: Partial<Record<keyof TFilters, boolean>> = {};
    (Object.keys(config) as Array<keyof TFilters>).forEach((key) => {
      const c = config[key];
      if (c && (c as any).isError) errors[key] = true;
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
    fieldErrors,
  } as const;
}

export default useFilters;
