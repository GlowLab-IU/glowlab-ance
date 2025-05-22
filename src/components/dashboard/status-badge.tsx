import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { GradientBadge } from "@/components/ui/gradient-badge"

interface StatusBadgeProps {
  status: "active" | "expiring" | "expired" | "pending"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
      label: "Active",
      variant: "success" as const,
    },
    expiring: {
      icon: <Clock className="mr-1 h-3 w-3" />,
      label: "Expiring Soon",
      variant: "warning" as const,
    },
    expired: {
      icon: <AlertCircle className="mr-1 h-3 w-3" />,
      label: "Expired",
      variant: "danger" as const,
    },
    pending: {
      icon: <Clock className="mr-1 h-3 w-3" />,
      label: "Pending",
      variant: "info" as const,
    },
  }

  const { icon, label, variant } = statusConfig[status]

  return (
    <GradientBadge variant={variant}>
      {icon}
      {label}
    </GradientBadge>
  )
}
