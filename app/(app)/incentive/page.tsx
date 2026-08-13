'use client'
import { ApplicationModal } from '@/components/incentives/application-modal'
import { IncentiveTierCard } from '@/components/incentives/incentive-card'
import { ReferralStats } from '@/components/incentives/referral-stats'
import Topbar from '@/components/shared/topbar'
import { useMainStore } from '@/lib/stores/use-main-store'
import React, { useEffect, useState } from 'react'

type IncentiveTierCardProps = {
  tier: Incentives
  currentReferrals: number
  onApply: (tier: Incentives) => void
  hasApplied: boolean
}

function Page() {
  const [selectedTier, setSelectedTier] = useState<Incentives | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appliedTiers, setAppliedTiers] = useState<number[]>([])
  const [nextMilestone, setNextMilestone] = useState<number>(0)
  const [incentiveTiers, setIncentiveTiers] = useState<Incentives[]>([])
  const currentReferrals = useMainStore((state) => state.mainDetails?.referral.active_downlines || 0)
  

  const mainDetails = useMainStore((state) => state.mainDetails)
  const token = useMainStore((state) => state.token)
  const loginState = useMainStore((state) => state.loginState)

    useEffect(() => {
      loginState()
    }, [loginState])

    useEffect(() => {
      if(mainDetails){
        
          const currentReferrals = mainDetails.referral.active_downlines
          const incentiveTiers = mainDetails.incentives

          // Calculate current level and next milestone
          const currentLevelIndex = incentiveTiers.findIndex((tier) => currentReferrals < tier.referrals)
          const currentLevel =
            currentLevelIndex === 0
              ? "Starter"
              : currentLevelIndex === -1
                ? "Elite"
                : incentiveTiers[currentLevelIndex - 1].name.split(" ")[0]
          const nextMilestone =
            currentLevelIndex === -1
              ? incentiveTiers[incentiveTiers.length - 1].referrals
              : incentiveTiers[currentLevelIndex].referrals

          setNextMilestone(nextMilestone)
          setIncentiveTiers(incentiveTiers)
              }
    }, [mainDetails])

  

  const handleApply = (tier: Incentives) => {
    setSelectedTier(tier)
    setIsModalOpen(true)
  }

  const handleModalClose = (open: boolean) => {
    if (!open && selectedTier) {
      // Mark tier as applied when modal closes after submission
      setAppliedTiers((prev) => [...prev, selectedTier.ID])
    }
    setIsModalOpen(open)
    if (!open) setSelectedTier(null)
  }

  const getRewardString = (tier: Incentives) => {
    let reward = `KSH ${tier.salary.toLocaleString()}/week`
    if (tier.bonusItem) {
      reward += ` + ${tier.bonusItem}`
    }
    return reward
  }
  return (
    <div>
      <Topbar title="Incentives" backBtn />
<div className="px-4 py-4 space-y-4">
        {/* Stats Card */}
        <ReferralStats currentReferrals={currentReferrals} nextMilestone={nextMilestone} currentLevel={mainDetails?.wallet.level ?? ''} />

        {/* Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-800 text-sm">
            <span className="font-semibold">Become an Agent!</span> Invite friends to join and when they become active
            members, unlock amazing rewards and weekly salary bonuses.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Reward Tiers</h2>

          {incentiveTiers.map((tier) => (
            <IncentiveTierCard
              key={tier.ID}
              tier={tier}
              currentReferrals={currentReferrals}
              onApply={handleApply}
              hasApplied={appliedTiers.includes(tier.ID)}
            />
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedTier && (
        <ApplicationModal
          open={isModalOpen}
          onOpenChange={handleModalClose}
          tierName={selectedTier.name}
          reward={getRewardString(selectedTier)}
          tierID={selectedTier.ID}
        />
      )}
    </div>
  )
}

export default Page