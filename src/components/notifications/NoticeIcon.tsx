import type { NoticeType } from "@/data/notifications";
import { cn } from "@/lib/cn";

const paths: Record<NoticeType, React.ReactNode> = {
  badge: (<><circle cx="12" cy="9" r="5" /><path d="m9 13.500-1.500 7.500 4.500-2.500 4.500 2.500L15 13.500" /></>),
  saved: (<path d="M12 20.500s-7.500-4.600-9.200-9.300C1.700 8 3.600 5 6.700 5c2 0 3.400 1.100 5.300 3.200C13.900 6.100 15.300 5 17.300 5c3.100 0 5 3 3.900 6.200-1.700 4.700-9.200 9.300-9.200 9.300Z" />),
  message: (<path d="M21 12a8 8 0 0 1-11.600 7.100L4 20.500l1.400-4.700A8 8 0 1 1 21 12Z" />),
  offer: (<><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.500" cy="8.500" r="1" /></>),
  order: (<><path d="M6.500 3h11l2.500 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7l2.500-4Z" /><path d="M4 7h16M16 11a4 4 0 0 1-8 0" /></>),
};

const tones: Record<NoticeType, string> = {
  badge: "bg-powder-200 text-powder-900",
  saved: "bg-[#fde8cf] text-papaya-700",
  message: "bg-blue-500/40 text-powder-900",
  offer: "bg-brown-100 text-papaya-700 ring-1 ring-papaya-500/30",
  order: "bg-grey-500 text-black",
};

export function NoticeIcon({ type, className }: { type: NoticeType; className?: string }) {
  return (
    <span className={cn("grid size-11 shrink-0 place-items-center rounded-full", tones[type], className)}>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {paths[type]}
      </svg>
    </span>
  );
}
