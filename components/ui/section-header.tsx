import { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  subtitle?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  align?: "center" | "left" | "right";
  as?: ElementType;
  className?: string;
}

export const SectionHeader = ({
  subtitle,
  title,
  children,
  align = "center",
  as: Component = "h3",
  className,
}: SectionHeaderProps) => {
  const headingContent = title ?? children;

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className
      )}
    >
      {subtitle && (
        <span className="text-xs font-medium uppercase sm:text-sm">
          {subtitle}
        </span>
      )}
      {headingContent && (
        <Component className="text-2xl font-medium uppercase sm:text-3xl md:text-4xl">
          {headingContent}
        </Component>
      )}
    </div>
  );
};
