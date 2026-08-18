import { BatteryCharging } from "lucide-react"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  showWordmark?: boolean
  inverted?: boolean
}

export function BrandLogo({
  className,
  showWordmark = true,
  inverted = false,
}: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm",
          inverted && "bg-sidebar-primary text-sidebar-primary-foreground"
        )}
      >
        <BatteryCharging className="size-5" />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-tight">
          <span
            className={cn(
              "text-sm font-semibold tracking-tight",
              inverted ? "text-sidebar-foreground" : "text-foreground"
            )}
          >
            VoltOps
          </span>
          <span
            className={cn(
              "text-[11px]",
              inverted ? "text-sidebar-foreground/65" : "text-muted-foreground"
            )}
          >
            Battery Sales AI
          </span>
        </span>
      ) : null}
    </div>
  )
}
