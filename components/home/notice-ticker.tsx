"use client"

import { useMainStore } from "@/lib/stores/use-main-store"
import { useCurrency } from "@/lib/hooks/use-currency"

/**
 * Notices on the rail.
 *
 * Standing tips about how the platform works. They used to be invented
 * payout lines ("0712 *** 447 withdrew KES 1,500") presented as other users'
 * activity; those were not drawn from any record, so they were replaced with
 * statements that are true for everyone. When the backend can serve recent
 * masked payouts, swap this list for that feed and nothing else has to change.
 */
const NOTICES = [
  "Every track you rent earns once a day, for its whole rental term",
  "Collect today's earnings from the Earnings tab",
  "Deposits arrive by M-Pesa STK push — confirm with your own PIN",
  "Set your withdrawal account once, then cash out to M-Pesa any time",
  "Share your invite code to build your crew",
  "Commission is counted across three levels of your crew",
  "Check Records for every deposit, withdrawal and earning",
  "Redeem coupon codes from the Bonus page",
  "Finished rentals move to Expired — rent a new track to keep earning",
  "Questions? Customer support is one tap away",
]

// One standing reminder, kept in the run because it is worth meeting often.
const SAFETY_LINE = "Your PIN stays yours. Musically will never ask for it."

/** How each kind of entry in your own history reads as it passes. */
function lineFor(type: string, amount: string) {
  const kind = type.toLowerCase()
  if (kind.includes("return")) return `You collected ${amount} from your tracks`
  if (kind.includes("bonus")) return `Bonus of ${amount} landed in your wallet`
  if (kind.includes("coupon")) return `Coupon redeemed — ${amount}`
  if (kind.includes("commission") || kind.includes("invite") || kind.includes("referral"))
    return `${amount} commission from your team`
  if (kind.includes("deposit") || kind.includes("recharge")) return `${amount} added to your wallet`
  if (kind.includes("withdraw") || kind.includes("cashout")) return `${amount} sent to your M-Pesa`
  if (kind.includes("transfer")) return `${amount} transferred`
  return `${type} — ${amount}`
}

const SETTLED = ["completed", "success", "approved"]

/**
 * The rail that runs under the picture.
 *
 * Your own settled history leads -- what you collected, the bonus that landed
 * -- and the standing notices follow.
 *
 * It travels right to left without stopping. The track carries the run twice
 * and moves exactly half its own width, so the second copy arrives where the
 * first began. Spacing lives in each item's right margin rather than in a
 * flex gap: a gap sits *between* items only, which leaves the two copies half
 * a gap out of step and jolts the loop once every pass.
 */
export function NoticeTicker() {
  const transactions = useMainStore((s) => s.mainDetails?.transactions)
  const format = useCurrency

  const mine = (transactions ?? [])
    .filter((t) => SETTLED.includes(String(t.status).toLowerCase()))
    .slice(0, 4)
    .map((t) => lineFor(t.type || t.name, format(t.amount ?? 0)))

  // The rail opens on a notice, so something is in frame from the first
  // moment rather than after your own history has gone by. Your own entries
  // are threaded in every fifth place, and the reminder comes round early.
  const lines: string[] = []
  const own = [...mine]
  NOTICES.forEach((notice, i) => {
    lines.push(notice)
    if (i === 1) lines.push(SAFETY_LINE)
    if (i % 5 === 4 && own.length) lines.push(own.shift() as string)
  })
  lines.push(...own)

  // Held at a steady reading pace whatever the list grows to.
  const duration = `${lines.length * 4}s`

  return (
    <div className="ticker -mx-4 overflow-hidden" aria-label="Notices">
      <div className="ticker-track flex w-max items-center" style={{ animationDuration: duration }}>
        {[...lines, ...lines].map((line, i) => (
          <span key={`${line}-${i}`} className="flex shrink-0 items-center gap-2.5 pr-7">
            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="text-sm whitespace-nowrap text-muted-foreground">{line}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
