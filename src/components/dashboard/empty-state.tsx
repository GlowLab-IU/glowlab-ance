"use client"

import type React from "react"

import { Clock, Plus } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  buttonText: string
  onAction?: () => void
}

export function EmptyState({
  icon = <Clock className="h-6 w-6 text-slate-400" />,
  title,
  description,
  buttonText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 rounded-full bg-slate-700/50 p-3">{icon}</div>
      <h3 className="mb-2 text-lg font-medium text-slate-200">{title}</h3>
      <p className="mb-4 text-sm text-slate-400 max-w-md">{description}</p>
      <GradientButton onClick={onAction}>
        <Plus className="mr-2 h-4 w-4" />
        {buttonText}
      </GradientButton>
    </div>
  )
}
