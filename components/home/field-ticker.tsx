"use client"

import { useMainStore } from "@/lib/stores/use-main-store"
import { useCurrency } from "@/lib/hooks/use-currency"

// Said plainly, these are the things the farm does for you. They are always
// here, so the rail is never empty on a brand-new account.
const FARM_LINES = [
  "Plots pay out once a day. Collect yours under Harvest.",
  "Your PIN stays yours. Cloud Farmer will never ask for it.",
  "Bring a neighbour in and you earn from three rings of their harvest.",
  "Withdrawals go straight to the M-Pesa number on your account.",
  "A plot keeps paying for its whole cycle, not just the first day.",
]

/** How each kind of entry in your own history reads as it passes. */
function lineFor(type: string, amount: string) {
  const kind = type.toLowerCase()
  if (kind.includes("return")) return `You collected ${amount} from your plots`
  if (kind.includes("bonus")) return `Bonus of ${amount} landed in your purse`
  if (kind.includes("coupon")) return `Coupon redeemed — ${amount}`
  if (kind.includes("commission") || kind.includes("invite") || kind.includes("referral"))
    return `${amount} commission from your team`
  if (kind.includes("deposit") || kind.includes("recharge")) return `${amount} added to your purse`
  if (kind.includes("withdraw") || kind.includes("cashout")) return `${amount} sent to your M-Pesa`
  if (kind.includes("transfer")) return `${amount} transferred`
  return `${type} — ${amount}`
}

const SETTLED = ["completed", "success", "approved"]

/**
 * The rail that runs under the picture.
 *
 * Your own settled history passes first -- what you actually collected, and
 * when -- followed by the plain facts about how the farm works. Everything on
 * it is either your own record or something the app can stand behind; nothing
 * is invented, and no one else's money is quoted.
 *
 * It travels right to left without stopping, and holds still for anyone who
 * has asked their system for reduced motion.
 */
export function FieldTicker() {
  const transactions = useMainStore((s) => s.mainDetails?.transactions)
  const format = useCurrency

  const mine = (transactions ?? [])
    .filter((t) => SETTLED.includes(String(t.status).toLowerCase()))
    .slice(0, 6)
    .map((t) => lineFor(t.type || t.name, format(t.amount ?? 0)))

  const lines = [...mine, ...FARM_LINES]

  // The track holds the list twice: the first copy slides fully out of frame
  // as the second takes its place, so the loop never shows a seam.
  const run = [...lines, ...lines]

  return (
    <div className="ticker -mx-4 overflow-hidden" aria-label="Farm notices">
      <div className="ticker-track flex w-max items-center gap-3">
        {run.map((line, i) => (
          <span key={`${line}-${i}`} className="flex shrink-0 items-center gap-3">
            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="text-sm whitespace-nowrap text-muted-foreground">{line}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
