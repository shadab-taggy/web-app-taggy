import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Input({
  label,
  error,
  hint,
  leading,
  trailing,
  className,
  id,
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-black">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex h-10 items-center gap-2 rounded-lg border bg-white px-3.5 shadow-card transition-colors",
          "focus-within:border-black focus-within:ring-1 focus-within:ring-black",
          error ? "border-danger" : "border-grey-600",
          props.disabled && "bg-grey-500/50 opacity-70",
        )}
      >
        {leading && <span className="text-muted">{leading}</span>}
        <input
          id={inputId}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-black outline-none md:text-md placeholder:text-placeholder disabled:cursor-not-allowed"
          {...props}
        />
        {trailing && <span className="text-muted">{trailing}</span>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
