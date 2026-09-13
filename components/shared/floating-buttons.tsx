"use client"
import { CustomerSupportIcon } from "hugeicons-react"

const SUPPORT_URL = process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT

export function FloatingButtons() {
  if (!SUPPORT_URL) return null

  return (
    <div className="fixed right-4 bottom-24 z-40">
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact customer support"
        className="flex size-12 items-center justify-center rounded-full bg-ink text-ink-foreground shadow-premium ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95"
      >
        <CustomerSupportIcon className="size-6" />
      </a>
    </div>
  )
}
