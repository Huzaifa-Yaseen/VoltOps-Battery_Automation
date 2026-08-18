import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { OrderStatus, QueryStatus, StockAvailability } from "@/types"

type StatusKind = QueryStatus | OrderStatus | StockAvailability

const statusClassName: Record<StatusKind, string> = {
  Processing: "border-transparent bg-sky-100 text-sky-800",
  Completed: "border-transparent bg-emerald-100 text-emerald-800",
  "Human Review": "border-transparent bg-amber-100 text-amber-900",
  Pending: "border-transparent bg-slate-100 text-slate-700",
  Confirmed: "border-transparent bg-indigo-100 text-indigo-800",
  Delivered: "border-transparent bg-emerald-100 text-emerald-800",
  "In Stock": "border-transparent bg-emerald-100 text-emerald-800",
  "Low Stock": "border-transparent bg-amber-100 text-amber-900",
  "Out of Stock": "border-transparent bg-red-100 text-red-800",
}

function assertNever(value: never): never {
  throw new Error(`Unhandled status: ${String(value)}`)
}

function getStatusClassName(status: StatusKind) {
  switch (status) {
    case "Processing":
    case "Completed":
    case "Human Review":
    case "Pending":
    case "Confirmed":
    case "Delivered":
    case "In Stock":
    case "Low Stock":
    case "Out of Stock":
      return statusClassName[status]
    default:
      return assertNever(status)
  }
}

export function StatusBadge({ status }: { status: StatusKind }) {
  return (
    <Badge variant="outline" className={cn("font-medium", getStatusClassName(status))}>
      {status}
    </Badge>
  )
}
