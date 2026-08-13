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
      <div className="mx-4 mb-6 rounded-xl bg-amber-50 p-5 mt-5">
        <div className="mb-4 flex items-center gap-2">
          <Ticket01Icon className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Redeem Coupon Code</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Enter your coupon code below to claim exclusive bonuses and rewards!
        </p>
        <form onSubmit={handleRedeemCoupon} className="space-y-3">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="border-primary/30 bg-background text-center text-lg font-semibold uppercase tracking-wider"
            maxLength={20}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Redeeming..." : "Redeem Coupon"}
          </Button>
        </form>
        {message && (
          <div
            className={`mt-3 rounded-lg p-3 text-center text-sm ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
            <div key={index} className="overflow-hidden rounded-xl border-2 border-primary/20 bg-background">
              {/* Header Row */}
              <div className="grid grid-cols-3 border-b border-primary/10 px-4 py-3">
                <span className="text-center text-sm text-muted-foreground">Invited Friends</span>
                <span className="text-center text-sm text-muted-foreground">Bonus</span>
                <span className="text-center text-sm text-muted-foreground">Claim</span>
              </div>
              {/* Values Row */}
              <div className="grid grid-cols-3 items-center px-4 py-4">
                <span className="text-center text-lg font-bold text-foreground">
                  {mainDetails.referral.active_downlines}/{tier.target}
                </span>
                <span className="text-center text-lg font-bold text-foreground">Ksh {tier.reward}</span>
                <div className="flex justify-center">
                  <Button
                    variant={isReady ? "default" : tier.is_claimed ? "default" : "secondary"}
                    size="sm"
                    className={
                      isReady 
                        ? "bg-primary text-primary-foreground"
                        : tier.is_claimed
                        ? "bg-green-500 text-white cursor-not-allowed"
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