import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import { posts } from "../data/blog";

/**
 * Tiny path router — the site is a single scrolling page plus two extra views,
 * so a full routing library is unnecessary. vercel.json rewrites every path to
 * index.html, which makes deep links work in production.
 */
export type Route =
  | { name: "home" }
  | { name: "project"; id: string }
  | { name: "resume" }
  | { name: "recruiter" }
  | { name: "post"; slug: string }
  | { name: "not-found" };

const NAV_EVENT = "pf:navigate";

export function parseRoute(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const project = clean.match(/^\/projects\/([a-z0-9-]+)$/i);
  if (project) {
    return projects.some((p) => p.id === project[1]) ? { name: "project", id: project[1] } : { name: "not-found" };
  }
  if (clean === "/resume") return { name: "resume" };
  if (clean === "/recruiter") return { name: "recruiter" };
  const post = clean.match(/^\/blog\/([a-z0-9-]+)$/i);
  if (post) return posts.some((p) => p.slug === post[1]) ? { name: "post", slug: post[1] } : { name: "not-found" };
  return { name: "home" };
}

export function navigate(path: string, opts: { replace?: boolean } = {}) {
  if (path === window.location.pathname + window.location.hash) return;
  if (opts.replace) window.history.replaceState({}, "", path);
  else window.history.pushState({}, "", path);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));
  useEffect(() => {
    const update = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener("popstate", update);
    window.addEventListener(NAV_EVENT, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(NAV_EVENT, update);
    };
  }, []);
  return route;
}

/** Go to a home-page section from anywhere (including detail/resume views). */
export function goToSection(id: string) {
  const path = id === "home" ? "/" : `/${id}`;
  const onHome = parseRoute(window.location.pathname).name === "home";
  if (!onHome) {
    navigate(path);
    // Wait for the home view to mount before scrolling.
    window.setTimeout(() => scrollToId(id), 80);
    return;
  }
  window.history.pushState({ sectionId: id }, "", path);
  scrollToId(id);
}

export function scrollToId(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "instant" : behavior, block: "start" });
  // Move focus for keyboard and screen-reader users without scrolling again.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
