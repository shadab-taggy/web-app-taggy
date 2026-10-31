import type { Metadata } from "next";
import { ListingWizard } from "@/components/sell/ListingWizard";
import { Container } from "@/components/sections";

export const metadata: Metadata = { title: "Add your item — Taggy" };

export default function NewListingPage() {
  return (
    <Container>
      <ListingWizard />
    </Container>
  );
}
