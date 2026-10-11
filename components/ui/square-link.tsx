import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SquareLinkProps
  extends ComponentPropsWithoutRef<typeof Link> {
  children?: ReactNode;
  className?: string;
  variant?: "secondary" | "foreground" | "primary";
}

export const SquareLink = ({
  children = "Reserve Now",
  href = "#",
  className,
  variant = "secondary",
  ...props
}: SquareLinkProps) => {
  const variantStyles = {
    secondary:
      "border-secondary text-secondary hover:bg-secondary hover:text-foreground",
    foreground:
      "border-foreground text-foreground hover:bg-foreground hover:text-background",
    primary:
      "border-primary text-primary hover:bg-primary hover:text-background",
  };

  return (
    <Link
      href={href}
      {...props}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center border px-8 py-3.5 text-sm font-medium uppercase transition-colors duration-300 select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
};

export default SquareLink;
