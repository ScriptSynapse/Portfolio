import { ArrowLeft, Clock } from "lucide-react";
import { useEffect } from "react";
import { posts, readingMinutes } from "../../data/blog";
import { getProject } from "../../data/projects";
import { goToSection, navigate } from "../../lib/router";
import { setPageMeta } from "../../lib/seo";

export function PostView({ slug }: { slug: string }) {
  const post = posts.find((p) => p.slug === slug)!;
  useEffect(() => {
    setPageMeta({ title: `${post.title} — Paulson Alex Fernandes`, description: post.summary, path: `/blog/${post.slug}` });
    window.scrollTo({ top: 0 });
  }, [post]);

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
      <button type="button" onClick={() => goToSection("blog")} className="inline-flex items-center gap-2 text-sm text-text-2 hover:text-accent">
        <ArrowLeft size={16} /> All posts
      </button>
      <p className="label-mono mt-8 text-accent">{post.category}</p>
      <h1 className="font-display mt-3 text-3xl font-bold leading-tight text-text sm:text-5xl">{post.title}</h1>
      <p className="mt-4 flex items-center gap-3 font-mono text-[12px] text-text-3">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} aria-hidden="true" /> {readingMinutes(post)} min read
        </span>
      </p>
      {post.cover && <img src={post.cover} alt="" className="mt-8 w-full rounded-xl border border-line" />}
      <div className="mt-8 grid gap-5 text-[16px] leading-relaxed text-text-2">
        {post.blocks.map((b, i) => {
          if (b.type === "h2") return <h2 key={i} className="font-display mt-4 text-2xl font-semibold text-text">{b.text}</h2>;
          if (b.type === "code")
            return (
              <pre key={i} className="term-scroll overflow-x-auto rounded-xl border border-line bg-bg-2 p-4 font-mono text-[13px] text-text">
                <code>{b.text}</code>
              </pre>
            );
          if (b.type === "list")
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          return <p key={i}>{b.text}</p>;
        })}
      </div>
      {post.relatedProjects && post.relatedProjects.length > 0 && (
        <aside className="mt-12 border-t border-line pt-6">
          <p className="label-mono text-text-3">Related projects</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.relatedProjects.map((id) => {
              const p = getProject(id);
              return p ? (
                <button key={id} type="button" onClick={() => navigate(`/projects/${id}`)} className="rounded-lg border border-line px-3 py-1.5 text-sm text-text-2 hover:border-accent/40 hover:text-text">
                  {p.shortTitle}
                </button>
              ) : null;
            })}
          </div>
        </aside>
      )}
    </article>
  );
}
