import { RichBlocks, slugify } from "@/components/content/RichBlocks";
import { Container } from "@/components/sections";
import type { LegalDoc } from "@/lib/content";

/** Long-form legal layout: sticky table of contents + readable column. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const toc = doc.blocks.filter((b): b is { type: "h2"; text: string } => b.type === "h2");

  return (
    <Container className="py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
        {toc.length > 2 && (
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-40">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">On this page</p>
              <ul className="flex flex-col gap-1 border-l border-grey-500">
                {toc.map((h) => (
                  <li key={h.text}>
                    <a
                      href={`#${slugify(h.text)}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-powder-900 hover:border-black hover:text-black"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        <article className="max-w-3xl">
          <h1 className="font-serif text-display-md font-semibold leading-tight">{doc.title}</h1>
          {doc.updated && <p className="mt-2 text-sm text-powder-900">{doc.updated}</p>}
          <div className="mt-8">
            <RichBlocks blocks={doc.blocks} />
          </div>
        </article>
      </div>
    </Container>
  );
}
