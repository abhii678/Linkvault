"use client";

import { LucideIcon } from "lucide-react";

interface StatChipProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconColorClass: string;
  bgColorClass: string;
}

export default function StatChip({
  label,
  value,
  icon: Icon,
  iconColorClass,
  bgColorClass,
}: StatChipProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${bgColorClass}`}
    >
      <div className="flex items-center justify-between">
        <Icon className={`h-5 w-5 ${iconColorClass}`} />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
    </div>
  );
}
