"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
} from "hugeicons-react"
import Topbar from "@/components/shared/topbar"
import { useMainStore } from "@/lib/stores/use-main-store"
import { toast } from "sonner"
import { initiateDeposit } from "@/lib/backend/actions"

const PRESET_AMOUNTS = [400, 800, 1200, 4500, 8500, 15000, 24000, 40000]

export default function RechargePage() {
  const [amount, setAmount] = useState("")
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const fetchMainDetails = useMainStore((state) => state.fetchMainDetails)
  const token = useMainStore((state) => state.token)

  const minDeposit = 400
  const maxDeposit = 80000

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString())
    setError("")
    setSuccessMessage("")
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setAmount(value)
    setError("")
    setSuccessMessage("")
  }

  const handleInitiateSTK = async () => {
    setError("")
    setSuccessMessage("")

    const numAmount = Number.parseInt(amount)

    if (!amount || numAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (!/^0\d{9}$/.test(mpesaPhone) && !/^254\d{9}$/.test(mpesaPhone)) {
      setError("Please enter a valid M-Pesa phone number")
      return
    }

    setIsLoading(true)
    try {
      const response = await initiateDeposit({
        userID: token,
        amount: String(numAmount),
        account: mpesaPhone,
        method: "mpesa",
      })
      if (response.status === "Success") {
        setSuccessMessage(response.message || "STK Push sent! Please check your phone and enter your M-Pesa PIN.")
        fetchMainDetails(token)
      } else {
        setError(response.message || "Failed to initiate payment. Please try again.")
      }
    } catch (error) {
      console.error("Error initiating STK push:", error)
      setError("Failed to initiate payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Topbar title="Recharge" backBtn />

      <div className="flex-1 px-6 py-6">
        {/* M-Pesa Info Banner */}
        <div className="bg-primary rounded-2xl p-5 text-primary-foreground mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">M</span>
            </div>
            <div>
              <h3 className="font-bold">M-Pesa Deposit</h3>
              <p className="text-primary-foreground/80 text-sm">Instant & Secure</p>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/90 mt-3">
            You will receive an STK push to complete the payment on your phone.
          </p>
        </div>

        {/* Amount Selection */}
        <div className="space-y-4 mb-6">
          <Label className="text-base font-semibold">Select Amount</Label>
          <div className="grid grid-cols-3 gap-3">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                onClick={() => handleAmountSelect(preset)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                  amount === preset.toString()
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary"
                }`}
              >
                KSH {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="amount">Or Enter Amount</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">KSH</span>
            <Input
              id="amount"
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              className="pl-14 h-14 text-xl font-semibold"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Min: KSH {minDeposit} | Max: KSH {maxDeposit.toLocaleString()}
          </p>
        </div>

        {/* M-Pesa Phone Number */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
          <div className="relative">
            <SmartPhone01Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="mpesaPhone"
              type="tel"
              value={mpesaPhone}
              onChange={(e) => setMpesaPhone(e.target.value)}
              placeholder="0712345678"
              className="pl-10 h-12"
            />
          </div>
          <p className="text-xs text-muted-foreground">Enter the phone number to receive STK push</p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center mb-6">{error}</div>
        )}

        {successMessage && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
            <CheckmarkCircle01Icon size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">{successMessage}</p>
          </div>
        )}

        {/* Deposit Summary */}
        {amount && Number.parseInt(amount) > 0 && (
          <div className="bg-muted rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-3 text-sm">Deposit Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">KSH {Number.parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction Fee</span>
                <span className="font-medium text-primary">FREE</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="font-semibold">Total to Pay</span>
                <span className="font-bold text-primary">KSH {Number.parseInt(amount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleInitiateSTK}
          className="w-full h-14 text-lg font-semibold"
          disabled={!amount || Number.parseInt(amount) <= 0 || isLoading}
        >
          {isLoading ? "Initiating..." : "Pay with M-Pesa"}
        </Button>

        {/* Instructions */}
        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-xl">
            <InformationCircleIcon size={20} className="text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <p className="font-semibold mb-1">How it works:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Click &quot;Pay with M-Pesa&quot;</li>
                <li>You&apos;ll receive an STK push on your phone</li>
                <li>Enter your M-Pesa PIN to complete</li>
                <li>Your account will be credited instantly</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
