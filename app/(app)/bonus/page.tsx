'use client'

import Topbar from '@/components/shared/topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { claimBonus, couponRedeem } from '@/lib/backend/actions'
import { useMainStore } from '@/lib/stores/use-main-store'
import { Ticket01Icon } from 'hugeicons-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


function Page() {
  const [couponCode, setCouponCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const loginState = useMainStore((state) => state.loginState)
  const fetchMainDetails = useMainStore((state) => state.fetchMainDetails)
  const mainDetails = useMainStore((state) => state.mainDetails)
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
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
      setIsLoading(false)
    }
  }
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
        {mainDetails?.bonuses.map((tier, index) => {
          const isReady = mainDetails.referral.active_downlines >= tier.target
          return (
            <div key={index} className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70">
              {/* Header Row */}
              <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-2.5">
                <span className="text-center text-xs font-medium text-muted-foreground">Invited Friends</span>
                <span className="text-center text-xs font-medium text-muted-foreground">Bonus</span>
                <span className="text-center text-xs font-medium text-muted-foreground">Claim</span>
              </div>
              {/* Values Row */}
              <div className="grid grid-cols-3 items-center px-4 py-4">
                <span className="text-center text-base font-semibold text-foreground tabular-nums">
                  {mainDetails.referral.active_downlines}/{tier.target}
                </span>
                <span className="text-center text-base font-semibold text-foreground tabular-nums">KSH {tier.reward}</span>
                <div className="flex justify-center">
                  <Button
                    variant={isReady ? "default" : tier.is_claimed ? "default" : "secondary"}
                    size="sm"
                    className={
                      isReady 
                        ? "bg-primary text-primary-foreground"
                        : tier.is_claimed
                        ? "bg-success-soft text-success cursor-not-allowed disabled:opacity-100"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }
                    disabled={!isReady || tier.is_claimed || isLoading}
                    onClick={() => {
                      handleClaimBonus(tier.ID)
                    }}
                  >
                    {isReady ? "Claim" : tier.is_claimed ? "Claimed" : isLoading ? "Claiming..." : "Not Ready"}
                   
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