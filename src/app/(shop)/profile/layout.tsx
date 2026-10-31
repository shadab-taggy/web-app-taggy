import { AccountSidebar } from "@/components/account/AccountSidebar";
import { Container } from "@/components/sections";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="grid gap-10 py-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
      <aside className="hidden lg:block">
        <div className="sticky top-40">
          <AccountSidebar />
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </Container>
  );
}
