import { renderHook, act } from "@testing-library/react";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("should initialize with default state (closed)", () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it("should initialize with custom initial state", () => {
    const { result } = renderHook(() => useDisclosure(true));

    expect(result.current.isOpen).toBe(true);
  });

  it("should open when open() is called", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close when close() is called", () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle state when toggle() is called", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should set specific value when set() is called", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.set(true);
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.set(false);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should maintain stable function references", () => {
    const { result, rerender } = renderHook(() => useDisclosure());

    const initialFunctions = {
      open: result.current.open,
      close: result.current.close,
      toggle: result.current.toggle,
      set: result.current.set,
    };

    act(() => {
      result.current.toggle();
    });
    rerender();

    expect(result.current.open).toBe(initialFunctions.open);
    expect(result.current.close).toBe(initialFunctions.close);
    expect(result.current.toggle).toBe(initialFunctions.toggle);
    expect(result.current.set).toBe(initialFunctions.set);
  });
});
