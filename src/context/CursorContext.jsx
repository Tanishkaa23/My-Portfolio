import React, { createContext, useContext, useMemo, useRef } from "react";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  // Mutable ref instead of state: hover changes happen on pointer move
  // inside the 3D scene and we don't want React re-renders on every frame.
  const stateRef = useRef({ hovering: false, label: "" });
  const listeners = useRef(new Set());

  const api = useMemo(
    () => ({
      set(hovering, label = "") {
        stateRef.current = { hovering, label };
        listeners.current.forEach((fn) => fn(stateRef.current));
      },
      subscribe(fn) {
        listeners.current.add(fn);
        return () => listeners.current.delete(fn);
      },
      getState() {
        return stateRef.current;
      },
    }),
    []
  );

  return <CursorContext.Provider value={api}>{children}</CursorContext.Provider>;
}

export function useCursorApi() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursorApi must be used within CursorProvider");
  return ctx;
}
