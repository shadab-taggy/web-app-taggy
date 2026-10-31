import type { Block } from "@/lib/content";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Renders structured copy with consistent desktop reading typography. */
export function RichBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-4 text-md text-[#3f3f3f] [&_a]:underline">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(b.text)}
                className="mt-6 scroll-mt-40 font-serif text-display-xs font-semibold text-black first:mt-0"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-2 text-lg font-semibold text-black">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-muted">
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-black">
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ol>
            );
          default:
            return (
              <p key={i} className="text-lg leading-relaxed">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}
