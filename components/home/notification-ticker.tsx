"use client"

import { VolumeHighIcon } from "hugeicons-react"
import { useEffect, useState } from "react"

const notifications = [
  "Giving up should never be an option.",
  "Just do it!"
]

export function NotificationTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-4 bg-card rounded-xl p-4 flex items-center gap-3 shadow-sm border border-border w-full">
      <VolumeHighIcon className="w-5 h-5 text-muted-foreground shrink-0" />
      <p className="text-sm text-foreground truncate animate-pulse text-center w-full">{notifications[currentIndex]}</p>
    </div>
  )
}
