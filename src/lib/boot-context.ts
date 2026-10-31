import { createContext, useContext } from "react";

/** True once the boot screen has finished (or was skipped). Hero entrance waits for it. */
export const BootContext = createContext(true);
export const useBooted = () => useContext(BootContext);

export const BOOT_SESSION_KEY = "pf-booted";

export function shouldShowBoot(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.webdriver && !/[?&]boot=1/.test(window.location.search)) return false;
  try {
    if (/[?&]boot=1/.test(window.location.search)) return true;
    return sessionStorage.getItem(BOOT_SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}
