import { goToSection } from "../../lib/router";

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="label-mono text-accent-3">Error 404 · route not found</p>
      <h1 className="font-display mt-4 text-4xl font-bold text-text">This module doesn’t exist.</h1>
      <p className="mt-3 text-text-2">The page you requested isn’t part of this portfolio.</p>
      <button type="button" onClick={() => goToSection("projects")} className="mt-8 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink">
        Browse projects
      </button>
    </div>
  );
}
