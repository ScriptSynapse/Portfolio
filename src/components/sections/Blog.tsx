import { ArrowRight, Clock } from "lucide-react";
import { posts, readingMinutes } from "../../data/blog";
import { navigate } from "../../lib/router";
import { Reveal, Section, SectionHeader } from "../ui/primitives";

/** Renders nothing until at least one real post exists in data/blog.ts. */
export function Blog() {
  if (posts.length === 0) return null;
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Section id="blog" labelledBy="blog-title">
      <SectionHeader id="blog-title" code="//" eyebrow="Security writing" title="Notes from the lab." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <a
              href={`/blog/${p.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/blog/${p.slug}`);
                window.scrollTo({ top: 0 });
              }}
              className="panel group flex h-full flex-col overflow-hidden transition-colors hover:border-accent/40"
            >
              {p.cover && <img src={p.cover} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
              <div className="flex flex-1 flex-col p-5">
                <p className="label-mono text-accent">{p.category}</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-text group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 text-sm text-text-2">{p.summary}</p>
                <p className="mt-auto flex items-center gap-3 pt-4 font-mono text-[11px] text-text-3">
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} aria-hidden="true" /> {readingMinutes(p)} min read
                  </span>
                  <ArrowRight size={14} className="ml-auto transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
