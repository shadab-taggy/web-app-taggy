import type { Metadata } from "next";
import { Container } from "@/components/sections";
import { BookTeamWizard } from "@/components/sell/BookTeamWizard";

export const metadata: Metadata = { title: "Book Listing Team — Taggy" };

export default function BookTeamPage() {
  return (
    <Container>
      <BookTeamWizard />
    </Container>
  );
}
