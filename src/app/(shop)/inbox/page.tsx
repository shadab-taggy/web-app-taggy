import type { Metadata } from "next";
import { InboxView } from "@/components/inbox/InboxView";
import { Container } from "@/components/sections";
import { conversations, threads } from "@/data/details";

export const metadata: Metadata = { title: "Inbox — Taggy" };

export default function InboxPage() {
  return (
    <Container className="py-8">
      <h1 className="sr-only">Inbox</h1>
      <InboxView conversations={conversations} threads={threads} />
    </Container>
  );
}
