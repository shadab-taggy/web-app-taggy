import {
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-lg border bg-white px-3.5 text-base text-black shadow-card md:text-md outline-none transition-colors placeholder:text-placeholder focus:border-black focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-60";

function Wrapper({
  id,
  label,
  optional,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label?: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface Common {
  label?: string;
  optional?: boolean;
  error?: string;
  hint?: string;
}

export function Select({
  label,
  optional,
  error,
  hint,
  className,
  id,
  children,
  ...props
}: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  const auto = useId();
  const sid = id ?? auto;
  return (
    <Wrapper id={sid} label={label} optional={optional} error={error} hint={hint} className={className}>
      <div className="relative">
        <select
          id={sid}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${sid}-error` : hint ? `${sid}-hint` : undefined}
          className={cn(control, "h-10 appearance-none pr-10", error ? "border-danger" : "border-grey-600")}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
      </div>
    </Wrapper>
  );
}

export function Textarea({
  label,
  optional,
  error,
  hint,
  className,
  id,
  maxLength,
  value,
  ...props
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const auto = useId();
  const tid = id ?? auto;
  const length = typeof value === "string" ? value.length : undefined;
  return (
    <Wrapper id={tid} label={label} optional={optional} error={error} hint={maxLength ? undefined : hint} className={className}>
      <textarea
        id={tid}
        value={value}
        maxLength={maxLength}
        aria-invalid={!!error || undefined}
        className={cn(control, "min-h-32 resize-y py-3", error ? "border-danger" : "border-grey-600")}
        {...props}
      />
      {maxLength && (
        <p className="flex justify-between text-xs text-muted">
          <span>Max {maxLength} characters</span>
          {length !== undefined && (
            <span>
              {length}/{maxLength}
            </span>
          )}
        </p>
      )}
    </Wrapper>
  );
}

export function Checkbox({
  label,
  className,
  children,
  ...props
}: { label?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 text-sm text-black", className)}>
      <input type="checkbox" className="mt-0.5 size-5 shrink-0 rounded-xs accent-black" {...props} />
      <span>{label ?? children}</span>
    </label>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-black" : "bg-grey-600",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white shadow transition-[left]",
          checked ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}
