import { useCallback, useEffect } from "react";
import { sections } from "../data/navigation";

const validIds = new Set(sections.map((s) => s.id));

function pathForId(id: string): string {
  return id === "home" ? "/" : `/${id}`;
}

function idFromPath(pathname: string): string {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  if (clean === "") return "home";
  return validIds.has(clean) ? clean : "";
}

/**
 * Keeps the browser URL in sync with whichever section is on screen
 * (e.g. /driver, /projects) instead of leaving everything on "/".
 *
 * - On first load, once the intro is done, jumps straight to the section
 *   named in the URL (so a direct visit to /driver lands on Driver).
 * - While scrolling, mirrors the active section into the URL with
 *   replaceState so it never spams browser history.
 * - Exposes navigateToSection() for nav links, which does a real
 *   pushState so back/forward works, plus a smooth scroll.
 * - Listens for back/forward navigation and scrolls to match.
 */
export function useSectionRouting(activeId: string, ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const path = pathForId(activeId);
    if (window.location.pathname !== path) {
      window.history.replaceState(window.history.state, "", path);
    }
  }, [activeId, ready]);

  useEffect(() => {
    if (!ready) return;
    const id = idFromPath(window.location.pathname);
    if (id && id !== "home") {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    }
    // Only run once, right when the intro finishes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    const onPopState = () => {
      const id = idFromPath(window.location.pathname) || "home";
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateToSection = useCallback((id: string) => {
    if (!validIds.has(id)) return;
    window.history.pushState({ sectionId: id }, "", pathForId(id));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { navigateToSection };
}
