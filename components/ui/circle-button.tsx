import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type CircleButtonProps = ComponentPropsWithoutRef<"button">;

export const CircleButton = ({
  className,
  children,
  type = "button",
  ...props
}: CircleButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "bg-background border-foreground text-foreground hover:bg-foreground hover:text-background flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
