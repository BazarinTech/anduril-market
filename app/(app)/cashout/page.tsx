"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  ArrowRight01Icon,
  Cancel01Icon,
  Settings01Icon,
  Wallet01Icon,
} from "hugeicons-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import Topbar from "@/components/shared/topbar"
import { PasswordInput } from "@/components/auth/password-input"
import { useMainStore } from "@/lib/stores/use-main-store"
import { parseLimit } from "@/lib/limits/amount"
import { initiateWithdrawal } from "@/lib/backend/actions"
import { toast } from "sonner"
import { useCurrency } from "@/lib/hooks/use-currency"

const PRESET_AMOUNTS = [150, 240, 360, 1350, 2550, 4500]

export default function CashoutPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPinDialog, setShowPinDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)
  const token = useMainStore((state) => state.token)
  const [fee, setFee] = useState(0)
  const [walletData, setWalletData] = useState({
    balance: 0,
    mpesaPhone: "",
    accountName: "",
    // null, not 0. Before the API responds the minimum is *unknown*, and 0
    // would make `amount < min` false for every amount -- the check would be
    // silently absent for anyone who submits during that window.
    minWithdraw: null as number | null,
    maxWithdraw: 0,
  })

  useEffect(() => {
    loginState()
  }, [loginState])

  useEffect(() => {
    if (mainDetails) {
      setWalletData({
        balance: Number(mainDetails.wallet.balance),
        mpesaPhone: mainDetails.wallet.withdrawal_account,
        accountName: mainDetails.wallet.withdrawal_name,
        minWithdraw: parseLimit(mainDetails.controls.minWithdrawal),
        maxWithdraw: 1000000,
      })
      setFee(mainDetails.controls.withFee)
    }
  }, [mainDetails])

  const hasWithdrawalAccount = mainDetails?.wallet?.withdrawal_account && mainDetails.wallet.withdrawal_account.trim() !== ""

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString())
    setError("")
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setAmount(value)
    setError("")
  }

  const handleProceed = () => {
    setError("")

    const numAmount = Number.parseInt(amount)

    if (!amount || numAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (walletData.minWithdraw === null) {
      setError("Still loading withdrawal limits. Please try again in a moment.")
      return
    }

    if (numAmount < walletData.minWithdraw) {
      setError(`Minimum withdrawal is KSH ${walletData.minWithdraw}`)
      return
    }

    if (numAmount > walletData.maxWithdraw) {
      setError(`Maximum withdrawal is KSH ${walletData.maxWithdraw.toLocaleString()}`)
      return
    }

    if (numAmount > walletData.balance) {
      setError("Insufficient balance")
      return
    }

    setShowPinDialog(true)
  }

  const handleWithdraw = async () => {
    if (!pin || pin.length < 4) {
      setErrorMessage("Please enter a valid PIN")
      return
    }

    // if (pin !== mainDetails?.wallet.withdrawal_pin) {
    //   setShowPinDialog(false)
    //   setPin("")
    //   setErrorMessage("Invalid withdrawal PIN. Please try again.")
    //   setShowErrorDialog(true)
    //   return
    // }

    setIsLoading(true)
    try {
      const response = await initiateWithdrawal({
        userID: token,
        amount,
        account: walletData.mpesaPhone,
        method: "mpesa",
        pin: pin,
      })
      if (response.status == "Success") {
        toast.success(response.message)
        setShowSuccessDialog(true)

        setTimeout(() => {
          setShowSuccessDialog(false)
          router.push("/records?tab=withdraw")
        }, 3000)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Withdrawal error:", error)
      setErrorMessage("An error occurred while processing your withdrawal. Please try again.")
      setShowErrorDialog(true)
    } finally {
      setIsLoading(false)
      setShowPinDialog(false)
      setPin("")
    }
  }

  return (
    <div>
      <Topbar title="Withdraw" backBtn />

      <div className="mx-auto max-w-md flex-1 px-5 py-6">
        {/* Check if withdrawal account is set */}
        {!hasWithdrawalAccount ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Wallet01Icon size={40} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">No Withdrawal Account</h2>
            <p className="text-muted-foreground text-center mb-6 max-w-xs">
              You need to set up your withdrawal account before you can withdraw funds.
            </p>
            <Button asChild className="gap-2">
              <Link href="/cashout-wallet">
                Set Up Withdrawal Account
                <ArrowRight01Icon size={18} />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <div className="bg-hero relative overflow-hidden rounded-xl p-5 mb-6 shadow-premium">
              <div className="flex items-center justify-between mb-2">
                <span className="text-eyebrow text-ink-foreground/60">Available balance</span>
                <Link href="/cashout-wallet" aria-label="Withdrawal wallet settings" className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors">
                  <Settings01Icon size={18} />
                </Link>
              </div>
              <p className="text-3xl font-semibold tabular-nums">KSH {walletData.balance.toLocaleString()}</p>
              <div className="brand-hairline my-4 opacity-60" />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-ink-foreground/60">Withdraw to</span>
                <span className="font-medium tabular-nums">{walletData.mpesaPhone}</span>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="space-y-4 mb-6">
              <Label className="text-base font-semibold">Select Amount</Label>
              <div className="grid grid-cols-3 gap-3">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleAmountSelect(preset)}
                    disabled={preset > walletData.balance}
                    className={`h-11 px-2 rounded-md font-semibold text-sm tabular-nums transition-all ${
                      amount === preset.toString()
                        ? "bg-primary text-primary-foreground shadow-premium"
                        : preset > walletData.balance
                          ? "bg-muted text-muted-foreground/60 cursor-not-allowed"
                          : "bg-card ring-1 ring-border hover:ring-primary"
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
                  className="pl-14 h-14 text-xl font-semibold tabular-nums"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Min: KSH {walletData.minWithdraw ?? "..."} | Max: KSH {walletData.maxWithdraw.toLocaleString()}
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center mb-6">{error}</div>
            )}

            {/* Withdraw Summary */}
            {amount && Number.parseInt(amount) > 0 && (
              <div className="bg-card ring-1 ring-border/70 rounded-xl p-4 mb-6">
                <h3 className="font-semibold mb-3 text-sm">Withdrawal Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium tabular-nums">KSH {Number.parseInt(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Fee</span>
                    <span className="font-medium text-muted-foreground tabular-nums">
                      {useCurrency((Number(amount) * fee) / 100)}
                    </span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold">You&apos;ll Receive</span>
                    <span className="font-semibold text-foreground tabular-nums">
                      {useCurrency(Number(amount) - (Number(amount) * fee) / 100)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleProceed}
              className="w-full h-12 text-base font-semibold gap-2"
              disabled={!amount || Number.parseInt(amount) <= 0}
            >
              Withdraw
              <ArrowRight01Icon size={20} />
            </Button>

            {/* Info */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-accent rounded-xl">
              <InformationCircleIcon size={20} className="text-accent-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-accent-foreground">
                Withdrawals are processed a maximum of 10 seconds to your registered M-Pesa number. Fee charged is{" "}
                {mainDetails?.controls.withFee}% per transaction.
              </p>
            </div>
          </>
        )}
      </div>

      {/* PIN Dialog */}
      <AlertDialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <AlertDialogContent className="max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Enter Withdrawal PIN</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Enter your 4-digit PIN to confirm withdrawal of{" "}
              <span className="font-semibold text-foreground">
                KSH {Number.parseInt(amount || "0").toLocaleString()}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <PasswordInput id="withdrawPin" name="withdrawPin" value={pin} onChange={setPin} placeholder="Enter PIN" />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => {
                setShowPinDialog(false)
                setPin("")
              }}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleWithdraw} disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm"}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog}>
        <AlertDialogContent className="max-w-sm mx-auto [&>button]:hidden">
          <AlertDialogHeader className="text-center">
            <div className="w-20 h-20 bg-success-soft rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckmarkCircle01Icon size={40} className="text-success" />
            </div>
            <AlertDialogTitle className="text-center">Withdrawal Successful!</AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-2">
              <p>
                <span className="font-semibold text-foreground text-xl tabular-nums">
                  KSH {Number.parseInt(amount || "0").toLocaleString()}
                </span>
              </p>
              <p>has been sent to {walletData.mpesaPhone}</p>
              <p className="text-xs">You will receive an M-Pesa confirmation shortly.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="max-w-sm mx-auto">
          <AlertDialogHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Cancel01Icon size={32} className="text-destructive" />
            </div>
            <AlertDialogTitle className="text-center">Withdrawal Failed</AlertDialogTitle>
            <AlertDialogDescription className="text-center">{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <Button onClick={() => setShowErrorDialog(false)} className="w-full">
            Try Again
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
