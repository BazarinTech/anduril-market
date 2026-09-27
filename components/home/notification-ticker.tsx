"use client"

import { Notification01Icon } from "hugeicons-react"
import { useEffect, useState } from "react"

const notifications = [
  "Welcome to the arena — everything is one tap away.",
  "Keep your PIN private. Spatakas will never ask for it.",
]

export function NotificationTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3 ring-1 ring-border/70">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Notification01Icon className="size-4" />
      </span>
      {/* Keyed so each message mounts fresh and fades in, rather than the old
          whole-line pulse, which read as a loading state. */}
      <p key={currentIndex} className="animate-in truncate text-sm text-foreground fade-in duration-500">
        {notifications[currentIndex]}
      </p>
    </div>
  )
}
