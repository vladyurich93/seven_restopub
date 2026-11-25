"use client";
import { useEffect, useRef, type RefObject } from "react";
import { registerModalVisibility } from "./modalVisibility";
const stack: HTMLElement[] = [];
let restorePage: (() => void) | undefined;
const inertOriginal = new Map<HTMLElement, boolean>();
function updateInert() {
  for (const [element, original] of inertOriginal) element.inert = original;
  inertOriginal.clear();
  const top = stack.at(-1);
  if (!top) return;
  let branch = top;
  while (branch.parentElement) {
    for (const sibling of Array.from(branch.parentElement.children)) {
      if (sibling !== branch && sibling instanceof HTMLElement) {
        inertOriginal.set(sibling, sibling.inert);
        sibling.inert = true;
      }
    }
    branch = branch.parentElement;
    if (branch === document.body) break;
  }
}
const focusable = (root: HTMLElement) => Array.from(root.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(el => !el.closest('[inert]') && el.getClientRects().length > 0);
export function useModalDialog(open: boolean, ref: RefObject<HTMLDivElement | null>, close: () => void) {
  const closeRef = useRef(close); closeRef.current = close;
  useEffect(() => {
    const root = ref.current;
    if (!open || !root) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!stack.length) {
      const y = window.scrollY;
      const bodyStyle = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow };
      const htmlOverflow = document.documentElement.style.overflow;
      Object.assign(document.body.style, { position: "fixed", top: `-${y}px`, width: "100%", overflow: "hidden" });
      document.documentElement.style.overflow = "hidden";
      restorePage = () => { Object.assign(document.body.style, bodyStyle); document.documentElement.style.overflow = htmlOverflow; window.scrollTo({ top: y, behavior: "instant" }); };
    }
    stack.push(root); updateInert();
    const unregister = registerModalVisibility();
    const focusFirst = () => (focusable(root)[0] ?? root).focus({ preventScroll: true });
    focusFirst();
    const keydown = (event: KeyboardEvent) => {
      if (stack.at(-1) !== root) return;
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); closeRef.current(); }
      if (event.key === "Tab") {
        const items = focusable(root); const first = items[0], last = items.at(-1);
        if (!first) { event.preventDefault(); root.focus(); }
        else if (event.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
      }
    };
    const focusin = (event: FocusEvent) => { if (stack.at(-1) === root && !root.contains(event.target as Node)) focusFirst(); };
    document.addEventListener("keydown", keydown, true); document.addEventListener("focusin", focusin);
    return () => {
      document.removeEventListener("keydown", keydown, true); document.removeEventListener("focusin", focusin);
      stack.splice(stack.indexOf(root), 1); updateInert(); unregister();
      if (!stack.length) { restorePage?.(); restorePage = undefined; }
      if (previous?.isConnected && !previous.closest("[inert]")) previous.focus({ preventScroll: true });
    };
  }, [open, ref]);
}
