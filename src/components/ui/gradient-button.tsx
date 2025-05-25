"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Không import ButtonProps nữa!

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: "blue-purple" | "green-blue" | "amber-red";
  size?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, gradient = "blue-purple", children, ...props }, ref) => {
    const gradientClasses = {
      "blue-purple":
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40",
      "green-blue":
        "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40",
      "amber-red":
        "bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40",
    };

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          className={cn(gradientClasses[gradient], className)}
          ref={ref}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton };
