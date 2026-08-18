"use client"

import type { ReactNode } from "react"
import { useEffect, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"

import { PageSkeleton } from "@/components/shared/table-skeleton"
import { isAuthenticated } from "@/lib/auth"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot() {
  return isAuthenticated()
}

function getServerSnapshot() {
  return false
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const authed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    if (!authed) {
      router.replace("/login")
    }
  }, [authed, router])

  if (!authed) {
    return (
      <div className="p-6">
        <PageSkeleton />
      </div>
    )
  }

  return children
}
