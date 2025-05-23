// components/ui/badge.tsx
import React from "react";
import { cn } from "@/lib/utils";

// 1) Tạo alias cho màu, không bao gồm undefined
export type BadgeColor =
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "violet"
  | "default";

// 2) BadgeProps có color optional, nhưng bên trong component
//    chúng ta gán default nên color luôn là BadgeColor
export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: BadgeColor;
}

export function Badge({
  children,
  className,
  color = "default", // đảm bảo ở đây luôn là BadgeColor
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";

  // 3) Dùng Record<BadgeColor, string> vì BadgeColor không có undefined
  const colorStyles: Record<BadgeColor, string> = {
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
