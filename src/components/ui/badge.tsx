import React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  color?: "red" | "blue" | "green" | "purple" | "violet" | "default";
};

export function CustomBadge({
  children,
  className,
  color = "default",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";

  const colorStyles = {
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    violet: "bg-violet-100 text-violet-800",
    default: "bg-slate-100 text-slate-800",
  };

  return (
    <span className={cn(baseStyles, colorStyles[color], className)}>
      {children}
    </span>
  );
}
