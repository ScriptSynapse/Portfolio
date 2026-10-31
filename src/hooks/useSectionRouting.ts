import { useEffect, useRef } from "react";
import { sections } from "../data/navigation";
import { scrollToId } from "../lib/router";

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
 * Keeps the URL in sync with the visible section (/projects, /contact …)
 * using replaceState so history isn't spammed, jumps to the section in the URL
 * on load (deep links), and handles back/forward between sections.
 * Preserved from the previous site and adapted to the new navigation.
 */
export function useSectionRouting(activeId: string, active: boolean) {
  // URL mirroring stays off until the deep-link jump has happened,
  // otherwise the initial "home" state would overwrite /projects etc.
  const settled = useRef(false);

  useEffect(() => {
    if (!active) {
      settled.current = false;
      return;
    }
    const id = idFromPath(window.location.pathname);
    if (!id || id === "home") {
      settled.current = true;
      return;
    }
    // Jump instantly, then correct once late layout (fonts, lazy chunks) settles.
    const t1 = window.setTimeout(() => scrollToId(id, "instant"), 60);
    const t2 = window.setTimeout(() => scrollToId(id, "instant"), 450);
    const t3 = window.setTimeout(() => (settled.current = true), 600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [active]);

  useEffect(() => {
    if (!active || !settled.current) return;
    const path = pathForId(activeId);
    if (window.location.pathname !== path) {
      window.history.replaceState(window.history.state, "", path);
    }
  }, [activeId, active]);

  useEffect(() => {
    if (!active) return;
    const onPopState = () => {
      const id = idFromPath(window.location.pathname);
      if (id) scrollToId(id);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [active]);
}
