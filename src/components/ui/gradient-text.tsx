import type React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  gradient?: "blue-purple" | "green-blue" | "amber-red";
}

export function GradientText({
  as: Component = "h1",
  gradient = "blue-purple",
  className,
  children,
  ...props
}: GradientTextProps) {
  const gradientClasses = {
    "blue-purple": "from-blue-400 via-purple-500 to-indigo-400",
    "green-blue": "from-green-400 via-teal-500 to-blue-400",
    "amber-red": "from-amber-400 via-orange-500 to-red-400",
  };

  return (
    <Component
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent font-bold",
        gradientClasses[gradient],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
