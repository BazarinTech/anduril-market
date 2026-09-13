'use client'
import { ApplicationModal } from '@/components/incentives/application-modal'
import { IncentiveTierCard } from '@/components/incentives/incentive-card'
import { ReferralStats } from '@/components/incentives/referral-stats'
import NoList from '@/components/shared/no-list'
import Topbar from '@/components/shared/topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useMainStore } from '@/lib/stores/use-main-store'
import React, { useEffect, useMemo, useState } from 'react'

function IncentivesSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading incentives">
      {/* Progress card: same ink surface as the real one, so the swap is calm. */}
      <div className="bg-hero rounded-xl p-4 shadow-premium">
        <Skeleton className="mb-4 h-5 w-32 bg-white/10" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-lg p-3 ring-1 ring-white/10">
              <Skeleton className="size-6 rounded-full bg-white/10" />
              <Skeleton className="h-6 w-10 bg-white/10" />
              <Skeleton className="h-3 w-16 bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="h-18.5 w-full rounded-xl" />

      <Skeleton className="h-5 w-28" />

      {[0, 1].map((i) => (
        <div key={i} className="overflow-hidden rounded-xl bg-card shadow-premium ring-1 ring-border/70">
          <div className="bg-hero flex items-center gap-2 px-4 py-3">
            <Skeleton className="h-5 w-8 rounded-full bg-white/10" />
            <Skeleton className="h-5 w-28 bg-white/10" />
          </div>
          <div className="space-y-4 p-4">
            <div className="flex justify-between"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-12" /></div>
            <Skeleton className="h-1.5 w-full rounded-full" />
            <div className="flex justify-between border-t border-border pt-3"><Skeleton className="h-4 w-28" /><Skeleton className="h-4 w-20" /></div>
            <Skeleton className="h-11 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Page() {
  const [selectedTier, setSelectedTier] = useState<Incentives | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appliedTiers, setAppliedTiers] = useState<number[]>([])

  const mainDetails = useMainStore((state) => state.mainDetails)
  const loginState = useMainStore((state) => state.loginState)

  useEffect(() => {
    loginState()
  }, [loginState])

  // Optional chaining at every level: when the API rejects a session it
  // answers with an error body, which the store keeps as mainDetails as-is.
  const currentReferrals = mainDetails?.referral?.active_downlines ?? 0
  const incentiveTiers = useMemo(() => mainDetails?.incentives ?? [], [mainDetails])

  /**
   * Referrals needed for the next tier.
   *
   * findIndex returns -1 both when every tier is reached *and* when there are
   * no tiers at all. The old code treated -1 only as "past the last tier" and
   * read tiers[length - 1] -- which on an empty list is tiers[-1], undefined,
   * and crashed the page. No tiers now means no milestone.
   */
  const nextMilestone = useMemo(() => {
    if (incentiveTiers.length === 0) return 0
    const next = incentiveTiers.find((tier) => currentReferrals < tier.referrals)
    return (next ?? incentiveTiers[incentiveTiers.length - 1]).referrals
  }, [incentiveTiers, currentReferrals])

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
      <div className="mx-auto max-w-md px-4 py-4 pb-10 space-y-4">
        {/*
          Keyed on "no data yet" rather than isMainFetching: on first paint the
          fetch has not started, so isMainFetching is still false, and gating on
          it flashed the empty state before the skeleton appeared.
        */}
        {!mainDetails ? (
          <IncentivesSkeleton />
        ) : (
          <>
            {/* Stats Card */}
            <ReferralStats currentReferrals={currentReferrals} nextMilestone={nextMilestone} currentLevel={mainDetails.wallet?.level ?? ''} />

            {/* Info Banner */}
            <div className="bg-accent border border-primary/15 rounded-xl p-4">
              <p className="text-accent-foreground text-sm">
                <span className="font-semibold">Become an Agent!</span> Invite friends to join and when they become active
                members, unlock amazing rewards and weekly salary bonuses.
              </p>
            </div>

            {/* Tier Cards */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-foreground">Reward Tiers</h2>

              {incentiveTiers.length === 0 ? (
                <NoList title="No reward tiers yet" description="New incentive tiers will appear here when they are available." />
              ) : (
                incentiveTiers.map((tier) => (
                  <IncentiveTierCard
                    key={tier.ID}
                    tier={tier}
                    currentReferrals={currentReferrals}
                    onApply={handleApply}
                    hasApplied={appliedTiers.includes(tier.ID)}
                  />
                ))
              )}
            </div>
          </>
        )}
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
