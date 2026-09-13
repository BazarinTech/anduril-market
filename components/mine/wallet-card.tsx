'use client'
import { useMainStore } from "@/lib/stores/use-main-store"
import { useCurrency } from "@/lib/hooks/use-currency"
import { cn } from "@/lib/utils"


type Props = {
  className?: string
}

function WalletCard({ className }: Props) {
  const mainDetails = useMainStore((state) => state.mainDetails)
  return (
    <div className={cn("bg-hero relative overflow-hidden rounded-xl p-5 shadow-premium", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-eyebrow text-ink-foreground/60">Available balance</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">{useCurrency(mainDetails?.wallet?.balance ?? 0)}</p>
        </div>
        <span className="text-eyebrow rounded-full bg-white/10 px-2.5 py-1 text-brand-bright ring-1 ring-white/10">
          Wallet
        </span>
      </div>

      <div className="brand-hairline my-4 opacity-60" />

      <dl className="grid grid-cols-3 gap-3">
        <div>
          <dt className="text-[11px] text-ink-foreground/60">Recharged</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums">{useCurrency(mainDetails?.wallet?.total_deposits ?? 0)}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-ink-foreground/60">Withdrawn</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums">{useCurrency(mainDetails?.wallet?.total_withdrawals ?? 0)}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-ink-foreground/60">Total income</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums">{useCurrency(mainDetails?.wallet?.income ?? 0)}</dd>
        </div>
      </dl>
    </div>
  )
}

export default WalletCard
