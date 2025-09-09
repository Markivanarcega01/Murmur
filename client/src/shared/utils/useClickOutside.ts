import React from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onOutside: () => void,
  exceptions: Array<React.RefObject<HTMLElement>> = [],
  eventType: "click" | "mousedown" | "touchstart" = "click" // default to click
) {
  React.useEffect(() => {
    function handler(e: MouseEvent | TouchEvent) {
      const el = ref.current;
      if (!el) return;
      const t = e.target as Node;
      const insideMain = el.contains(t);
      const insideExceptions = exceptions.some((r) => r.current?.contains(t));
      if (!insideMain && !insideExceptions) onOutside();
    }
    document.addEventListener(eventType, handler);
    return () => document.removeEventListener(eventType, handler);
  }, [ref, onOutside, exceptions, eventType]);
}
