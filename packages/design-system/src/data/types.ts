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