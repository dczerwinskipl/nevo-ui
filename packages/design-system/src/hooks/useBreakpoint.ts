import { useState, useEffect } from "react";

/**
 * Breakpoint configuration matching Tailwind defaults
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook for detecting current screen size breakpoint
 *
 * @param breakpoint - The breakpoint to check against (default: 'md')
 * @returns Whether the screen is at or above the breakpoint
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = !useBreakpoint('md');
 *   const isDesktop = useBreakpoint('lg');
 *
 *   return isMobile ? <MobileView /> : <DesktopView />;
 * }
 * ```
 */
export function useBreakpoint(breakpoint: Breakpoint = "md"): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= BREAKPOINTS[breakpoint];
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${BREAKPOINTS[breakpoint]}px)`
    );

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [breakpoint]);

  return matches;
}

/**
 * Hook for getting current window dimensions
 *
 * @returns Object with width and height
 *
 * @example
 * ```tsx
 * function Component() {
 *   const { width, height } = useWindowSize();
 *
 *   return <div>Window: {width}x{height}</div>;
 * }
 * ```
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
