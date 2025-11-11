import { renderHook, act } from "@testing-library/react";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  const defaultConfig = {
    totalItems: 100,
    itemsPerPage: 10,
  };

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => usePagination(defaultConfig));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.itemsPerPage).toBe(10);
    expect(result.current.totalItems).toBe(100);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(9);
  });

  it("should initialize with custom initial page", () => {
    const { result } = renderHook(() =>
      usePagination({ ...defaultConfig, initialPage: 5 })
    );

    expect(result.current.currentPage).toBe(5);
    expect(result.current.startIndex).toBe(40);
    expect(result.current.endIndex).toBe(49);
  });

  it("should go to next page", () => {
    const { result } = renderHook(() => usePagination(defaultConfig));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.startIndex).toBe(10);
    expect(result.current.endIndex).toBe(19);
    expect(result.current.hasPreviousPage).toBe(true);
  });

  it("should go to previous page", () => {
    const { result } = renderHook(() =>
      usePagination({ ...defaultConfig, initialPage: 3 })
    );

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.startIndex).toBe(10);
    expect(result.current.endIndex).toBe(19);
  });

  it("should not go beyond last page", () => {
    const { result } = renderHook(() =>
      usePagination({ ...defaultConfig, initialPage: 10 })
    );

    expect(result.current.hasNextPage).toBe(false);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(10);
  });

  it("should not go before first page", () => {
    const { result } = renderHook(() => usePagination(defaultConfig));

    expect(result.current.hasPreviousPage).toBe(false);

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should go to specific page", () => {
    const { result } = renderHook(() => usePagination(defaultConfig));

    act(() => {
      result.current.goToPage(5);
    });

    expect(result.current.currentPage).toBe(5);
    expect(result.current.startIndex).toBe(40);
    expect(result.current.endIndex).toBe(49);
  });

  it("should clamp page to valid range when using goToPage", () => {
    const { result } = renderHook(() => usePagination(defaultConfig));

    act(() => {
      result.current.goToPage(999);
    });
    expect(result.current.currentPage).toBe(10);

    act(() => {
      result.current.goToPage(-5);
    });
    expect(result.current.currentPage).toBe(1);
  });

  it("should reset to initial page", () => {
    const { result } = renderHook(() =>
      usePagination({ ...defaultConfig, initialPage: 3 })
    );

    act(() => {
      result.current.goToPage(7);
    });
    expect(result.current.currentPage).toBe(7);

    act(() => {
      result.current.reset();
    });
    expect(result.current.currentPage).toBe(3);
  });

  it("should handle last page with partial items", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 95,
        itemsPerPage: 10,
        initialPage: 10,
      })
    );

    expect(result.current.currentPage).toBe(10);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.startIndex).toBe(90);
    expect(result.current.endIndex).toBe(94); // Only 5 items on last page
    expect(result.current.hasNextPage).toBe(false);
  });

  it("should calculate total pages correctly", () => {
    const { result: result1 } = renderHook(() =>
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    );
    expect(result1.current.totalPages).toBe(10);

    const { result: result2 } = renderHook(() =>
      usePagination({ totalItems: 95, itemsPerPage: 10 })
    );
    expect(result2.current.totalPages).toBe(10);

    const { result: result3 } = renderHook(() =>
      usePagination({ totalItems: 101, itemsPerPage: 10 })
    );
    expect(result3.current.totalPages).toBe(11);
  });

  it("should handle empty data", () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 0, itemsPerPage: 10 })
    );

    expect(result.current.totalPages).toBe(0);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
  });
});
