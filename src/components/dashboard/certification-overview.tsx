import { ChevronRight } from "lucide-react"
import { GradientCard } from "@/components/ui/gradient-card"
import Link from "next/link"

interface CertificationStat {
  label: string
  value: string
  percentage: number
  color: string
}

interface CertificationOverviewProps {
  stats: CertificationStat[]
}

export function CertificationOverview({ stats }: CertificationOverviewProps) {
  return (
    <GradientCard
      header={
        <>
          <h3 className="text-slate-200 font-bold">Certification Overview</h3>
          <p className="text-sm text-slate-400">Status of product certifications</p>
        </>
      }
      footer={
        <Link
          href="#"
          className="text-xs text-slate-400 hover:text-blue-400 hover:underline flex items-center transition-colors"
        >
          View detailed reports
          <ChevronRight className="ml-1 h-3 w-3" />
        </Link>
      }
    >
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-300">{stat.label}</span>
              <span className="font-medium text-slate-200">{stat.value}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-700/50">
              <div className={`h-2 rounded-full ${stat.color}`} style={{ width: `${stat.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </GradientCard>
  )
}
