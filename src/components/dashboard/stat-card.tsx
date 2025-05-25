// stat-card.tsx
"use client";

import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/gradient-card";
import { GradientText } from "@/components/ui/gradient-text";

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  delay?: number;
}

export function StatCard({ title, value, subtext, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <GradientCard>
        <div className="pb-2">
          <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        </div>
        <div>
          <GradientText as="div" className="text-2xl font-bold">
            {value}
          </GradientText>
          <p className="text-xs text-slate-400">{subtext}</p>
        </div>
      </GradientCard>
    </motion.div>
  );
}
