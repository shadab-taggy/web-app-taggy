/** Rich-text building blocks shared by guides, FAQs and legal pages. */
export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface Guide {
  /** URL slug under /guides/[slug]. */
  slug: string;
  title: string;
  /** e.g. "2 minutes read" */
  readTime: string;
  blocks: Block[];
}

export interface FaqItem {
  question: string;
  /** One string per paragraph. */
  answer: string[];
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export interface LegalDoc {
  title: string;
  /** e.g. "Last updated: …" if the design shows one. */
  updated?: string;
  blocks: Block[];
}
