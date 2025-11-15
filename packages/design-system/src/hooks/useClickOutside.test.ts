import { renderHook, act } from "@testing-library/react";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  it("should call handler when clicking outside element", () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    // Create a mock element and attach ref
    const element = document.createElement("div");
    (result.current as React.MutableRefObject<HTMLDivElement>).current =
      element;
    document.body.appendChild(element);

    // Click outside
    act(() => {
      document.body.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    });

    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(element);
  });

  it("should not call handler when clicking inside element", () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    const element = document.createElement("div");
    (result.current as React.MutableRefObject<HTMLDivElement>).current =
      element;
    document.body.appendChild(element);

    // Click inside
    act(() => {
      element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it("should not call handler when disabled", () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler, false));

    const element = document.createElement("div");
    (result.current as React.MutableRefObject<HTMLDivElement>).current =
      element;
    document.body.appendChild(element);

    act(() => {
      document.body.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    });

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it("should handle touch events", () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    const element = document.createElement("div");
    (result.current as React.MutableRefObject<HTMLDivElement>).current =
      element;
    document.body.appendChild(element);

    act(() => {
      document.body.dispatchEvent(
        new TouchEvent("touchstart", { bubbles: true })
      );
    });

    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(element);
  });

  it("should clean up event listeners on unmount", () => {
    const handler = jest.fn();
    const { result, unmount } = renderHook(() => useClickOutside(handler));

    const element = document.createElement("div");
    (result.current as React.MutableRefObject<HTMLDivElement>).current =
      element;
    document.body.appendChild(element);

    unmount();

    act(() => {
      document.body.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    });

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it("should not call handler if ref is not attached", () => {
    const handler = jest.fn();
    renderHook(() => useClickOutside(handler));

    act(() => {
      document.body.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
