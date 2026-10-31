import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChatIcon } from "@/components/icons";
import { ContactForm } from "@/components/content/ContactForm";
import { Container } from "@/components/sections";

export const metadata: Metadata = { title: "Contact Us — Taggy" };

export default function ContactPage() {
  return (
    <Container className="py-8 lg:py-12">
      <div className="relative mb-12 h-56 overflow-hidden rounded-2xl bg-grey-500 md:h-72">
        <Image
          src="/images/contact-hero.webp"
          alt=""
          fill
          priority
          sizes="(min-width:1280px) 1216px, 100vw"
          className="object-cover object-[center_30%]"
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h1 className="font-serif text-display-md font-semibold">Got a question?</h1>
          <div className="mt-5 flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-[#3f3f3f]">
            <p>
              You can check out our main menu from the app that includes information about how to use Taggy,{" "}
              <Link href="/guides" className="underline">Helpful Guides</Link>,{" "}
              <Link href="/faqs" className="underline">FAQs</Link>, Marketplace rules,{" "}
              <Link href="/terms" className="underline">Terms &amp; Conditions</Link> and more!
            </p>
            <p>Most of the time, you’ll find the answer to what you need there.</p>
            <p>Still need help? We’d love to hear from you!</p>
            <p>Choose your preferred contact method and our team will be happy to help.</p>
          </div>

          <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <li>
              <a
                href="mailto:hello@taggy.ae"
                className="flex h-full flex-col gap-1 rounded-lg border border-powder-200 p-4 transition-shadow hover:shadow-popover"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Email</span>
                <span className="text-md font-medium text-powder-900">hello@taggy.ae</span>
              </a>
            </li>
            <li>
              <Link
                href="/inbox"
                className="flex h-full items-center justify-between gap-3 rounded-lg border border-powder-200 p-4 transition-shadow hover:shadow-popover"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">Chat</span>
                  <span className="text-md font-medium text-powder-900">Chat with us</span>
                </span>
                <ChatIcon className="size-5 text-powder-900" />
              </Link>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
