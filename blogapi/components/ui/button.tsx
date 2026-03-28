"use client";

import * as React from "react";
import { cn } from "@/libs/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition outline-none disabled:pointer-events-none disabled:opacity-50",
          variant === "outline"
            ? "border border-slate-200 bg-white/90 px-4 py-3 text-slate-700 shadow-sm hover:bg-white"
            : "bg-slate-900 px-5 py-3 text-white hover:bg-slate-700",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
