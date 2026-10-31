import Link from "next/link";
import { ArrowLeftIcon, PlusIcon } from "@/components/icons";

/** Title row for account pages: back link (mobile), serif title, optional action. */
export function PageHeader({
  title,
  back = "/profile",
  backLabel = "Account",
  action,
}: {
  title: string;
  back?: string;
  backLabel?: string;
  action?: { href?: string; label: string; onClick?: () => void; icon?: boolean };
}) {
  const actionClass =
    "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-powder-900 transition-colors hover:bg-grey-500 hover:text-black";
  return (
    <div className="mb-6">
      <Link
        href={back}
        className="-ml-1 mb-1 inline-flex items-center gap-1.5 px-1 py-2 text-sm text-powder-900 hover:text-black lg:hidden"
      >
        <ArrowLeftIcon className="size-4" /> {backLabel}
      </Link>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-display-xs font-semibold">{title}</h1>
        {action &&
          (action.href ? (
            <Link href={action.href} className={actionClass}>
              {action.icon !== false && <PlusIcon className="size-4" />}
              {action.label}
            </Link>
          ) : (
            <button type="button" onClick={action.onClick} className={actionClass}>
              {action.icon !== false && <PlusIcon className="size-4" />}
              {action.label}
            </button>
          ))}
      </div>
    </div>
  );
}
