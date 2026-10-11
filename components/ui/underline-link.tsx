import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface UnderlineLinkProps extends ComponentPropsWithoutRef<
  typeof Link
> {
  children?: ReactNode;
  className?: string;
}

export const UnderlineLink = ({
  children = "Discover More",
  className,
  ...props
}: UnderlineLinkProps) => {
  return (
    <Link
      {...props}
      className={cn(
        "relative mt-2 inline-block pb-1 text-xs font-medium uppercase transition-colors duration-300 sm:text-sm",
        "before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-current before:transition-transform before:duration-300 before:ease-out hover:before:origin-left hover:before:scale-x-100",
        className
      )}
    >
      {children}
    </Link>
  );
};
