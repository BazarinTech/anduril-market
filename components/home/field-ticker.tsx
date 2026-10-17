"use client"

import { useMainStore } from "@/lib/stores/use-main-store"
import { useCurrency } from "@/lib/hooks/use-currency"

/**
 * Notices from around the farm.
 *
 * Hard-coded at the platform owner's instruction. They are not drawn from
 * live records, so keep them representative of what the farm actually pays;
 * when the backend can serve recent masked payouts, swap this list for that
 * feed and nothing else here has to change.
 *
 * Numbers are masked the same way the team tables mask them.
 */
const NOTICES = [
  "Congratulations 0712 *** 447 — collected KES 256 today",
  "0798 *** 112 withdrew KES 1,500 to M-Pesa",
  "Bonus received by 0722 *** 059 — KES 100",
  "0745 *** 380 earned KES 420 from a level 1 farmer",
  "0711 *** 204 took a new plot — KES 1,200",
  "0733 *** 901 finished a 30-day cycle — KES 3,600 in all",
  "Coupon redeemed by 0757 *** 318 — KES 250",
  "Congratulations 0769 *** 472 — collected KES 480 today",
  "0720 *** 663 cashed out KES 5,000 to M-Pesa",
  "0790 *** 155 earned KES 90 from a level 2 farmer",
  "Congratulations 0714 *** 027 — first harvest collected",
  "0738 *** 844 brought in three farmers this week",
  "0702 *** 590 claimed a KES 300 invite bonus",
  "0748 *** 236 withdrew KES 2,750 to M-Pesa",
  "0729 *** 471 collected KES 120 today",
  "0771 *** 608 earned KES 60 from a level 3 farmer",
  "Congratulations 0705 *** 193 — agent salary of KES 2,000 paid",
  "0754 *** 729 opened two plots today",
  "0783 *** 015 collected KES 960 today",
  "Bonus received by 0796 *** 342 — KES 500",
]

// One standing reminder, kept in the run because it is worth meeting often.
const SAFETY_LINE = "Your PIN stays yours. Cloud Farmer will never ask for it."

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
 * Your own settled history leads -- what you collected, the bonus that landed
 * -- and the notices from the rest of the farm follow.
 *
 * It travels right to left without stopping. The track carries the run twice
 * and moves exactly half its own width, so the second copy arrives where the
 * first began. Spacing lives in each item's right margin rather than in a
 * flex gap: a gap sits *between* items only, which leaves the two copies half
 * a gap out of step and jolts the loop once every pass.
 */
export function FieldTicker() {
  const transactions = useMainStore((s) => s.mainDetails?.transactions)
  const format = useCurrency

  const mine = (transactions ?? [])
    .filter((t) => SETTLED.includes(String(t.status).toLowerCase()))
    .slice(0, 4)
    .map((t) => lineFor(t.type || t.name, format(t.amount ?? 0)))

  // The rail opens on a notice, so a phone line is in frame from the first
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
    <div className="ticker -mx-4 overflow-hidden" aria-label="Farm notices">
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
