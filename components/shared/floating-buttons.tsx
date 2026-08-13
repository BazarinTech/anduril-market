"use client"
import { CustomerSupportIcon } from "hugeicons-react"

const SUPPORT_URL = process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT

export function FloatingButtons() {
  if (!SUPPORT_URL) return null

  return (
    <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact customer support"
        className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <CustomerSupportIcon className="w-6 h-6 text-accent-foreground" />
      </a>
      <div className="text-xs text-foreground font-medium text-center">Support</div>
    </div>
  )
}
