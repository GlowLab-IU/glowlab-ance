import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border-0 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white",
  {
    variants: {
      variant: {
        success: "bg-gradient-to-r from-green-600 to-emerald-600",
        warning: "bg-gradient-to-r from-amber-600 to-orange-600",
        danger: "bg-gradient-to-r from-red-600 to-rose-600",
        info: "bg-gradient-to-r from-blue-600 to-indigo-600",
        default: "bg-gradient-to-r from-slate-600 to-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface GradientBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function GradientBadge({ className, variant, ...props }: GradientBadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { GradientBadge }
