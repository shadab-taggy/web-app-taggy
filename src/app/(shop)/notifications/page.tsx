import type { Metadata } from "next";
import { Container } from "@/components/sections";
import { NotificationsView } from "@/components/account/NotificationsView";

export const metadata: Metadata = { title: "Notifications — Taggy" };

export default function Page() {
  return <Container><NotificationsView /></Container>;
}
