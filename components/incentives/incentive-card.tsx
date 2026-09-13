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
    <div className="bg-card rounded-xl ring-1 ring-border/70 shadow-premium overflow-hidden">
      {/* Header */}
      <div className="bg-hero relative px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-eyebrow bg-white/10 text-brand-bright ring-1 ring-white/10 px-2 py-0.5 rounded-full">{tier.level}</span>
          <h3 className="text-ink-foreground font-semibold">{tier.name}</h3>
        </div>
        {isEligible && <CheckmarkCircle02Icon size={20} className="text-brand-bright" />}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Requirements */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserGroupIcon size={20} />
            <span className="text-sm">Active Referrals</span>
          </div>
          <span className="font-semibold text-foreground tabular-nums">
            {currentReferrals} / {tier.referrals}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isEligible ? "bg-success" : "bg-primary"}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Rewards */}
        <div className="space-y-2 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Money01Icon size={20} />
              <span className="text-sm">Weekly Salary</span>
            </div>
            <span className="font-semibold text-foreground tabular-nums">KSH {tier.salary.toLocaleString()}</span>
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
            <Button disabled className="w-full h-11 bg-warning-soft text-warning disabled:opacity-100 hover:bg-warning-soft">
              <Clock01Icon size={18} className="mr-2" />
              Application Pending
            </Button>
          ) : isEligible && !tier.isClaimed  ? (
            <Button
              onClick={() => onApply(tier)}
              className="w-full h-11 font-semibold"
            >
              <CheckmarkCircle02Icon size={18} className="mr-2" />
              Apply Now
            </Button>
          ) : tier.isClaimed ? (
            <Button disabled className="w-full h-11 bg-success-soft text-success disabled:opacity-100 hover:bg-success-soft">
              <CheckmarkCircle02Icon size={18} className="mr-2" />
              Claimed
            </Button>
          ) : (
            <Button disabled className="w-full h-11 bg-muted text-muted-foreground hover:bg-muted">
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
