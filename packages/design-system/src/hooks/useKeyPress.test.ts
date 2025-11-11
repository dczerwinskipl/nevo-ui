import { renderHook, act, waitFor } from "@testing-library/react";
import { useKeyPress, useKeyPressMap } from "./useKeyPress";

describe("useKeyPress", () => {
  it("should call handler when specified key is pressed", () => {
    const handler = jest.fn();
    renderHook(() => useKeyPress("Escape", handler));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should not call handler when different key is pressed", () => {
    const handler = jest.fn();
    renderHook(() => useKeyPress("Escape", handler));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it("should not call handler when disabled", () => {
    const handler = jest.fn();
    renderHook(() => useKeyPress("Escape", handler, false));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it("should clean up event listener on unmount", () => {
    const handler = jest.fn();
    const { unmount } = renderHook(() => useKeyPress("Escape", handler));

    unmount();

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it("should update handler when it changes", async () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const { rerender } = renderHook(
      ({ handler }) => useKeyPress("Escape", handler),
      { initialProps: { handler: handler1 } }
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).not.toHaveBeenCalled();

    rerender({ handler: handler2 });

    await waitFor(() => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      });
    });

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});

describe("useKeyPressMap", () => {
  it("should call correct handler for each key", () => {
    const escapeHandler = jest.fn();
    const enterHandler = jest.fn();
    const tabHandler = jest.fn();

    renderHook(() =>
      useKeyPressMap({
        Escape: escapeHandler,
        Enter: enterHandler,
        Tab: tabHandler,
      })
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(escapeHandler).toHaveBeenCalledTimes(1);
    expect(enterHandler).not.toHaveBeenCalled();
    expect(tabHandler).not.toHaveBeenCalled();

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });
    expect(escapeHandler).toHaveBeenCalledTimes(1);
    expect(enterHandler).toHaveBeenCalledTimes(1);
    expect(tabHandler).not.toHaveBeenCalled();
  });

  it("should not call any handler for unmapped keys", () => {
    const escapeHandler = jest.fn();
    const enterHandler = jest.fn();

    renderHook(() =>
      useKeyPressMap({
        Escape: escapeHandler,
        Enter: enterHandler,
      })
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    });

    expect(escapeHandler).not.toHaveBeenCalled();
    expect(enterHandler).not.toHaveBeenCalled();
  });

  it("should not call handlers when disabled", () => {
    const handler = jest.fn();
    renderHook(() => useKeyPressMap({ Escape: handler }, false));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
