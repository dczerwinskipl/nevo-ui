import { useState, useEffect, useCallback } from "react";

/**
 * Hook for managing data snapshot during loading states
 * Prevents UI flicker by maintaining previous data while fetching new data
 * 
 * @param data - Current data
 * @param isLoading - Loading state
 * @returns Display data (snapshot during loading, current data otherwise)
 * 
 * @example
 * ```tsx
 * function DataList({ data, isLoading }: Props) {
 *   const displayData = useDataSnapshot(data, isLoading);
 *   
 *   return (
 *     <div>
 *       {displayData.map(item => <Item key={item.id} {...item} />)}
 *       {isLoading && <LoadingOverlay />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDataSnapshot<T>(
  data: T[] | undefined,
  isLoading: boolean
): T[] {
  const [snapshot, setSnapshot] = useState<T[]>([]);
  const [prevIsLoading, setPrevIsLoading] = useState(isLoading);

  useEffect(() => {
    // Update snapshot when loading completes or when we have data
    if ((!isLoading && prevIsLoading) || (data && data.length > 0)) {
      setSnapshot(data || []);
    }
    setPrevIsLoading(isLoading);
  }, [isLoading, prevIsLoading, data]);

  // Return snapshot during loading if we have it, otherwise return current data
  if (isLoading && snapshot.length > 0) {
    return snapshot;
  }

  return data || [];
}

/**
 * Hook for managing previous value of a state/prop
 * Useful for comparing current and previous values
 * 
 * @param value - Current value to track
 * @returns Previous value
 * 
 * @example
 * ```tsx
 * function Counter({ count }: { count: number }) {
 *   const prevCount = usePrevious(count);
 *   
 *   return <div>Count changed from {prevCount} to {count}</div>;
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useState<{ value: T; prev: T | undefined }>({
    value,
    prev: undefined,
  })[0];

  const getPrevious = useCallback(() => {
    if (ref.value !== value) {
      ref.prev = ref.value;
      ref.value = value;
    }
    return ref.prev;
  }, [value, ref]);

  return getPrevious();
}
