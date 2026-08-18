import { cn } from "@/lib/utils"

type ConfidenceScoreProps = {
  value: number
  className?: string
}

function getTone(value: number) {
  if (value >= 90) {
    return "bg-emerald-500"
  }

  if (value >= 75) {
    return "bg-sky-500"
  }

  return "bg-amber-500"
}

export function ConfidenceScore({ value, className }: ConfidenceScoreProps) {
  return (
    <div className={cn("flex min-w-28 items-center gap-2", className)}>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", getTone(value))}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-medium tabular-nums">
        {value}%
      </span>
    </div>
  )
}
