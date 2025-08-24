import * as React from "react";

import { cn } from "@/lib/utils/index";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputClassName?: string;
}

function Input({
  className,
  inputClassName,
  type,
  prefix,
  suffix,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        "border-input relative flex h-9 w-full items-center rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        { "space-x-2": Boolean(prefix) },
        className,
      )}
    >
      {prefix && prefix}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName,
        )}
        {...props}
      />
      {suffix && suffix}
    </div>
  );
}

export { Input };
