import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** Types and deletes each discipline in turn. Static list under reduced motion. */
export function RoleTyper({ words, start }: { words: string[]; start: boolean }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || !start) return;
    const word = words[i % words.length];
    let t: number;
    if (!deleting && n < word.length) t = window.setTimeout(() => setN(n + 1), 55);
    else if (!deleting) t = window.setTimeout(() => setDeleting(true), 1800);
    else if (n > 0) t = window.setTimeout(() => setN(n - 1), 28);
    else
      t = window.setTimeout(() => {
        setDeleting(false);
        setI(i + 1);
      }, 250);
    return () => window.clearTimeout(t);
  }, [n, deleting, i, words, reduced, start]);

  if (reduced) return <span>{words.join(" · ")}</span>;
  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="caret">
        {words[i % words.length].slice(0, n)}
      </span>
    </>
  );
}
