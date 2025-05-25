import { CheckCircle2, ChevronRight, Clock, Edit } from "lucide-react"
import { GradientCard } from "@/components/ui/gradient-card"
import Link from "next/link"

interface Activity {
  icon: "check" | "clock" | "edit"
  title: string
  description: string
  time: string
}

interface ActivityCardProps {
  activities: Activity[]
}

export function ActivityCard({ activities }: ActivityCardProps) {
  const iconMap = {
    check: {
      icon: <CheckCircle2 className="h-4 w-4 text-green-400" />,
      bgClass: "bg-gradient-to-br from-green-600/20 to-emerald-600/20",
    },
    clock: {
      icon: <Clock className="h-4 w-4 text-amber-400" />,
      bgClass: "bg-gradient-to-br from-amber-600/20 to-orange-600/20",
    },
    edit: {
      icon: <Edit className="h-4 w-4 text-blue-400" />,
      bgClass: "bg-gradient-to-br from-blue-600/20 to-indigo-600/20",
    },
  }

  return (
    <GradientCard
      header={
        <>
          <h3 className="text-slate-200 font-bold">Recent Activities</h3>
          <p className="text-sm text-slate-400">Latest certification activities</p>
        </>
      }
      footer={
        <Link
          href="#"
          className="text-xs text-slate-400 hover:text-blue-400 hover:underline flex items-center transition-colors"
        >
          View all activities
          <ChevronRight className="ml-1 h-3 w-3" />
        </Link>
      }
    >
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`rounded-full ${iconMap[activity.icon].bgClass} p-2`}>{iconMap[activity.icon].icon}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-200">{activity.title}</p>
              <p className="text-xs text-slate-400">{activity.description}</p>
              <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </GradientCard>
  )
}
