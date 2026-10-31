import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Rendered instead of the default message when something below throws. */
  fallback?: ReactNode;
  /** Changing this resets the boundary (e.g. the current route). */
  resetKey?: string;
}

interface State {
  error: Error | null;
  key?: string;
}

/** Keeps one failing section (or chunk-load error) from blanking the whole page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, key: this.props.resetKey };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    if (props.resetKey !== state.key) return { error: null, key: props.resetKey };
    return null;
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;
    return (
      <div role="alert" className="mx-auto my-24 max-w-lg rounded-2xl border border-line bg-card p-8 text-center">
        <p className="label-mono text-accent-3">Module failed to load</p>
        <p className="mt-3 text-text-2">Something went wrong while loading this part of the site. Reloading usually fixes it.</p>
        <button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink">
          Reload page
        </button>
      </div>
    );
  }
}
