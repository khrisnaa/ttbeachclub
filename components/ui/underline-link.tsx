import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface UnderlineLinkProps
  extends ComponentPropsWithoutRef<typeof Link> {
  children?: ReactNode;
  className?: string;
  withUnderline?: boolean;
}

export const UnderlineLink = ({
  children = "Discover More",
  className,
  withUnderline = false,
  ...props
}: UnderlineLinkProps) => {
  return (
    <Link
      {...props}
      className={cn(
        "relative mt-2 inline-block pb-1 text-sm font-medium uppercase transition-colors duration-300",
        "before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-current before:transition-transform before:duration-300 before:ease-out",
        withUnderline
          ? "before:origin-left before:scale-x-100 hover:before:origin-right hover:before:scale-x-0"
          : "before:origin-right before:scale-x-0 hover:before:origin-left hover:before:scale-x-100",
        className
      )}
    >
      {children}
    </Link>
  );
};
