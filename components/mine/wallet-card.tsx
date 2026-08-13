'use client'
import { useMainStore } from "@/lib/stores/use-main-store"
import { Card } from "../ui/card"
import { useCurrency } from "@/lib/hooks/use-currency"


type Props = {
  className?: string
}

function WalletCard({ className }: Props) {
  const mainDetails = useMainStore((state) => state.mainDetails)
  return (
    <Card className={`p-4 bg-primary text-primary-foreground ${className}`}>
      {/* Top row - 3 stats */}
      <div className="flex justify-between border-b-2 border-primary-foreground/30 border-dotted pb-4 mb-4">
        <div className="flex-1 text-center">
          <p className="text-lg font-bold">{useCurrency(mainDetails?.wallet.balance ?? 0)}</p>
          <p className="text-xs text-primary-foreground/80">Available Balance</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-bold">{useCurrency(mainDetails?.wallet.total_withdrawals ?? 0)}</p>
          <p className="text-xs text-primary-foreground/80">Total Withdraw</p>
        </div>
      </div>

      {/* Bottom row - 3 stats */}
      <div className="flex justify-between">
        <div className="flex-1 text-center">
          <p className="text-lg font-bold">{useCurrency(mainDetails?.wallet.total_deposits ?? 0)}</p>
          <p className="text-xs text-primary-foreground/80">Total Recharged</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-bold">{useCurrency(mainDetails?.wallet.income ?? 0)}</p>
          <p className="text-xs text-primary-foreground/80">Total Obtained Income</p>
        </div>
      </div>
    </Card>
  )
}

export default WalletCard
