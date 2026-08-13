"use client"

import { UserGroupIcon, ArrowUp01Icon, Medal01Icon } from "hugeicons-react"

type Props = {
  currentReferrals: number
  nextMilestone: number
  currentLevel: string
}

export function ReferralStats({ currentReferrals, nextMilestone, currentLevel }: Props) {
  return (
    <div className="bg-linear-to-br from-primary to-primary/80 rounded-2xl p-4 text-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Medal01Icon size={22} />
        Your Progress
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <UserGroupIcon size={24} className="mx-auto mb-1 opacity-80" />
          <p className="text-2xl font-bold">{currentReferrals}</p>
          <p className="text-xs opacity-80">Active Referrals</p>
        </div>

        <div className="bg-white/10 rounded-xl p-3 text-center">
          <ArrowUp01Icon size={24} className="mx-auto mb-1 opacity-80" />
          <p className="text-2xl font-bold">{nextMilestone - currentReferrals}</p>
          <p className="text-xs opacity-80">To Next Level</p>
        </div>

        <div className="bg-white/10 rounded-xl p-3 text-center">
          <ArrowUp01Icon size={24} className="mx-auto mb-1 opacity-80" />
          <p className="text-2xl font-bold">{currentLevel}</p>
          <p className="text-xs opacity-80">Current Level</p>
        </div>
      </div>
    </div>
  )
}
