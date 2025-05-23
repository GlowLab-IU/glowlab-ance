import type * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
  footer?: React.ReactNode
  glow?: boolean
}

export function GradientCard({ className, header, footer, glow = true, children, ...props }: GradientCardProps) {
  return (
    <Card
      className={cn("border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden relative", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 z-0"></div>
      {glow && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl opacity-20 -z-10"></div>
      )}
      {header && <CardHeader className="relative z-10">{header}</CardHeader>}
      <CardContent className={cn("relative z-10", !header && "pt-6")}>{children}</CardContent>
      {footer && <CardFooter className="border-t border-slate-700/50 relative z-10">{footer}</CardFooter>}
    </Card>
  )
}
