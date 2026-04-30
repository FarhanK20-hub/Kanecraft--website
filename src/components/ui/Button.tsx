import React from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-[var(--color-brand-primary)] text-white hover:opacity-90",
      secondary: "border-2 border-[var(--color-brand-dark-green)] dark:border-[var(--color-brand-light-green)] text-[var(--color-brand-dark-green)] dark:text-[var(--color-brand-light-green)] hover:bg-[var(--color-brand-dark-green)] dark:hover:bg-[var(--color-brand-light-green)] hover:text-white",
      ghost: "text-[var(--color-brand-black)] dark:text-white hover:bg-black/5",
    };
    
    const sizes = {
      sm: "h-8 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-16 px-8 text-lg",
    };

    return (
      <Magnetic className="inline-flex">
        <button
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          {...props}
        />
      </Magnetic>
    );
  }
);
Button.displayName = "Button";
