import Image from "next/image";
import { Logo } from "@/components/ui/Logo";

/**
 * Desktop auth layout: brand image panel on the left, form on the right.
 * On mobile the panel is hidden and the form fills the screen (as in Figma).
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden bg-grey-500 lg:block">
        <Image
          src="/images/dress-olive.webp"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-10 pt-24">
          <p className="max-w-md font-serif text-display-sm font-medium leading-tight text-white">
            Pre-loved fashion, given a second life.
          </p>
        </div>
      </aside>

      <main id="main" className="flex flex-col items-center justify-center px-4 py-10">
        <div className="flex w-full max-w-[420px] flex-col items-center">
          <Logo width={130} className="mb-8" />
          <h1 className="text-center font-serif text-display-xs font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-center text-md text-powder-900">{subtitle}</p>}
          <div className="mt-8 w-full">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-powder-900">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
