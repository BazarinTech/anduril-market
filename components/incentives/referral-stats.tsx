"use client"

import { UserGroupIcon, ArrowUp01Icon, Medal01Icon } from "hugeicons-react"

type Props = {
  currentReferrals: number
  nextMilestone: number
  currentLevel: string
}

export function ReferralStats({ currentReferrals, nextMilestone, currentLevel }: Props) {
  return (
    <div className="bg-hero relative overflow-hidden rounded-xl p-4 shadow-premium">
      <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
        <Medal01Icon size={20} className="text-brand-bright" />
        Your Progress
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 ring-1 ring-white/10 rounded-lg p-3 text-center">
          <UserGroupIcon size={24} className="mx-auto mb-1 text-brand-bright" />
          <p className="text-xl font-semibold tabular-nums">{currentReferrals}</p>
          <p className="text-[11px] text-ink-foreground/60">Active Referrals</p>
        </div>

        <div className="bg-white/5 ring-1 ring-white/10 rounded-lg p-3 text-center">
          <ArrowUp01Icon size={24} className="mx-auto mb-1 text-brand-bright" />
          {/* Clamped: once every tier is reached the milestone is behind you, not negative. */}
          <p className="text-xl font-semibold tabular-nums">{Math.max(nextMilestone - currentReferrals, 0)}</p>
          <p className="text-[11px] text-ink-foreground/60">To Next Level</p>
        </div>

        <div className="bg-white/5 ring-1 ring-white/10 rounded-lg p-3 text-center">
          <ArrowUp01Icon size={24} className="mx-auto mb-1 text-brand-bright" />
          <p className="text-xl font-semibold tabular-nums">{currentLevel}</p>
          <p className="text-[11px] text-ink-foreground/60">Current Level</p>
        </div>
      </div>
    </div>
  )
}
