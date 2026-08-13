"use client"

import { Button } from "@/components/ui/button"
import { UserGroupIcon, Money01Icon, Gif01Icon, CheckmarkCircle02Icon, LockIcon } from "hugeicons-react"


type Props = {
  tier: Incentives
  currentReferrals: number
  onApply: (tier: Incentives) => void
  hasApplied?: boolean
}

export function IncentiveTierCard({ tier, currentReferrals, onApply, hasApplied }: Props) {
  const isEligible = currentReferrals >= tier.referrals
  const progress = Math.min((currentReferrals / tier.referrals) * 100, 100)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">{tier.level}</span>
          <h3 className="text-white font-semibold">{tier.name}</h3>
        </div>
        {isEligible && <CheckmarkCircle02Icon size={20} className="text-green-300" />}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Requirements */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserGroupIcon size={20} />
            <span className="text-sm">Active Referrals</span>
          </div>
          <span className="font-bold text-foreground">
            {currentReferrals} / {tier.referrals}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: isEligible ? "#22c55e" : "#7c2d12",
            }}
          />
        </div>

        {/* Rewards */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Money01Icon size={20} />
              <span className="text-sm">Weekly Salary</span>
            </div>
            <span className="font-bold text-green-600">KSH {tier.salary.toLocaleString()}</span>
          </div>

          {tier.bonusItem && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gif01Icon size={20} />
                <span className="text-sm">Bonus Reward</span>
              </div>
              <span className="font-semibold text-primary">{tier.bonusItem}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {hasApplied ? (
            <Button disabled className="w-full rounded-xl py-5 bg-amber-100 text-amber-800 hover:bg-amber-100">
              <Clock01Icon size={18} className="mr-2" />
              Application Pending
            </Button>
          ) : isEligible && !tier.isClaimed  ? (
            <Button
              onClick={() => onApply(tier)}
              className="w-full rounded-xl py-5 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckmarkCircle02Icon size={18} className="mr-2" />
              Apply Now
            </Button>
          ) : tier.isClaimed ? (
            <Button disabled className="w-full rounded-xl py-5 bg-green-100 text-green-800 hover:bg-green-100">
              <CheckmarkCircle02Icon size={18} className="mr-2" />
              Claimed
            </Button>
          ) : (
            <Button disabled className="w-full rounded-xl py-5 bg-gray-100 text-gray-400 hover:bg-gray-100">
              <LockIcon size={18} className="mr-2" />
              {tier.referrals - currentReferrals} more referrals needed
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Import Clock01Icon at the top
import { Clock01Icon } from "hugeicons-react"
