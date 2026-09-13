'use client'

import Topbar from '@/components/shared/topbar'
import NoList from '@/components/shared/no-list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { claimBonus, couponRedeem } from '@/lib/backend/actions'
import { useMainStore } from '@/lib/stores/use-main-store'
import { Ticket01Icon } from 'hugeicons-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


function BonusTierSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70">
      <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-2.5">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="mx-auto h-4 w-16" />)}
      </div>
      <div className="grid grid-cols-3 items-center px-4 py-4">
        <Skeleton className="mx-auto h-5 w-12" />
        <Skeleton className="mx-auto h-5 w-16" />
        <Skeleton className="mx-auto h-7 w-16" />
      </div>
    </div>
  )
}

function Page() {
  const [couponCode, setCouponCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const loginState = useMainStore((state) => state.loginState)
  const fetchMainDetails = useMainStore((state) => state.fetchMainDetails)
  const mainDetails = useMainStore((state) => state.mainDetails)
  // Which tier is being claimed, not a single flag: a shared boolean disabled
  // every tier at once and could not say which one was in flight.
  const [claimingId, setClaimingId] = useState<ID | null>(null)
  const token = useMainStore((state) => state.token)

    useEffect(() => {
      loginState()
    }, [loginState])

  const handleRedeemCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponCode.trim()) {
      setMessage({ type: "error", text: "Please enter a coupon code" })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    // Simulate API call
    try {
      const response = await couponRedeem({userID: token, code: couponCode})
      if(response.status === "Success"){
        setMessage({ type: "success", text: response.message })
        setCouponCode("")
        fetchMainDetails(token)
      }else{
        setMessage({ type: "error", text: response.message })
      }
    } catch (error) {
      console.error("Error redeeming coupon:", error)
      setMessage({ type: "error", text: "An error occurred while redeeming the coupon. Please try again." })
      return
    }finally {
      setIsSubmitting(false)
    }
  }

  const handleClaimBonus = async (bonusID: ID) => {
    setClaimingId(bonusID)
    try {
      const response = await claimBonus({userID: token, bonusID})
      if(response.status === "Success"){
        toast.success(response.message)
        fetchMainDetails(token)
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Error claiming bonus:", error)
      toast.error("An error occurred while claiming the bonus.")
    }finally {
      setClaimingId(null)
    }
  }

  // Optional chaining at every level: when the API rejects a session it
  // answers with an error body, which the store keeps as mainDetails as-is.
  const activeReferrals = mainDetails?.referral?.active_downlines ?? 0
  const bonuses = mainDetails?.bonuses ?? []

  return (
    <div>
      <Topbar title="Bonus" backBtn />

      {/* Coupon Redemption Section */}
      <div className="bg-hero relative mx-4 mb-6 mt-5 overflow-hidden rounded-xl p-5 shadow-premium">
        <div className="mb-4 flex items-center gap-2">
          <Ticket01Icon className="h-5 w-5 text-brand-bright" />
          <h2 className="text-base font-semibold text-ink-foreground">Redeem Coupon Code</h2>
        </div>
        <p className="mb-4 text-sm text-ink-foreground/70">
          Enter your coupon code below to claim bonuses and rewards.
        </p>
        <form onSubmit={handleRedeemCoupon} className="space-y-3">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="h-12 border-white/15 bg-white/5 text-center font-mono text-lg font-semibold uppercase tracking-[0.2em] text-ink-foreground placeholder:text-ink-foreground/40"
            maxLength={20}
          />
          <Button
            type="submit"
            className="h-11 w-full bg-white font-semibold text-ink hover:bg-white/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Redeeming..." : "Redeem Coupon"}
          </Button>
        </form>
        {message && (
          <div
            className={`mt-3 rounded-lg p-3 text-center text-sm ${
              message.type === "success" ? "bg-success-soft text-success" : "bg-destructive/15 text-white"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* Bonus Tiers */}
      <div className="space-y-4 px-4 mb-10">
        <h2 className="text-base font-semibold text-foreground">Referral Bonuses</h2>

        {/* Keyed on "no data yet": on first paint the fetch has not started, so
            gating on isMainFetching would flash the empty state first. */}
        {!mainDetails ? (
          <div className="space-y-4" aria-busy="true" aria-label="Loading bonuses">
            <BonusTierSkeleton />
            <BonusTierSkeleton />
            <BonusTierSkeleton />
          </div>
        ) : bonuses.length === 0 ? (
          <NoList title="No bonuses yet" description="Referral bonuses will appear here when they are available." />
        ) : bonuses.map((tier) => {
          const isReady = !tier.is_claimed && activeReferrals >= tier.target
          const isClaiming = claimingId === tier.ID
          return (
            <div key={tier.ID} className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70">
              {/* Header Row */}
              <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-2.5">
                <span className="text-center text-xs font-medium text-muted-foreground">Invited Friends</span>
                <span className="text-center text-xs font-medium text-muted-foreground">Bonus</span>
                <span className="text-center text-xs font-medium text-muted-foreground">Claim</span>
              </div>
              {/* Values Row */}
              <div className="grid grid-cols-3 items-center px-4 py-4">
                <span className="text-center text-base font-semibold text-foreground tabular-nums">
                  {activeReferrals}/{tier.target}
                </span>
                <span className="text-center text-base font-semibold text-foreground tabular-nums">KSH {tier.reward}</span>
                <div className="flex justify-center">
                  {/* Claimed is checked first: a tier can be both claimed and still
                      "ready" by referral count, and used to show a dead Claim button. */}
                  <Button
                    variant={isReady ? "default" : "secondary"}
                    size="sm"
                    className={
                      tier.is_claimed
                        ? "bg-success-soft text-success disabled:opacity-100"
                        : isReady
                        ? ""
                        : "bg-muted text-muted-foreground"
                    }
                    disabled={!isReady || claimingId !== null}
                    onClick={() => {
                      handleClaimBonus(tier.ID)
                    }}
                  >
                    {tier.is_claimed ? "Claimed" : isClaiming ? "Claiming..." : isReady ? "Claim" : "Not ready"}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page