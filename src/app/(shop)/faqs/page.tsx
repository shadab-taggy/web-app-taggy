import type { Metadata } from "next";
import { FaqView } from "@/components/content/FaqView";
import { Container } from "@/components/sections";
import { faqs } from "@/data/legal";

export const metadata: Metadata = { title: "FAQs — Taggy" };

export default function FaqsPage() {
  return (
    <Container className="py-10 lg:py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3 font-serif text-display-md font-semibold">FAQs</h1>
        <p className="mb-8 text-lg text-powder-900">Quick answers to the questions we hear most.</p>
        <FaqView groups={faqs} />
      </div>
    </Container>
  );
}
