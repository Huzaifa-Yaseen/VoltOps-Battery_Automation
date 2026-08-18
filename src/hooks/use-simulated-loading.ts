"use client"

import { useEffect, useState } from "react"

export function useSimulatedLoading(delayMs = 500) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsLoading(false)
    }, delayMs)

    return () => window.clearTimeout(timeout)
  }, [delayMs])

  return isLoading
}
