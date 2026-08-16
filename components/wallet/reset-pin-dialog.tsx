"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LockPasswordIcon, MessageNotification01Icon } from "hugeicons-react"
import { toast } from "sonner"
import { requestPinResetCode, resetWithdrawalPin } from "@/lib/backend/actions"

interface ResetPinDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  token: string
  onSuccess: () => void
}

/**
 * Reset the withdrawal PIN when the current one has been forgotten.
 *
 * Two steps, deliberately: request a code, then set the new PIN with it. The
 * code is checked and the PIN written in the *same* backend call, so there is
 * never a verified-but-unused code sitting around for something else to spend.
 *
 * The destination phone number is never sent from here. The backend reads it
 * off the account, so a stolen session cannot redirect the code to another
 * handset. What comes back is a masked version, purely to tell the user which
 * number to check.
 */
export function ResetPinDialog({ open, onOpenChange, token, onSuccess }: ResetPinDialogProps) {
  const [step, setStep] = useState<"request" | "verify">("request")
  const [code, setCode] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [maskedPhone, setMaskedPhone] = useState("")
  const [error, setError] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  // Seconds until another code can be requested. The backend rate-limits this
  // for real; the countdown just stops people mashing the button into it.
  const [cooldown, setCooldown] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (cooldown <= 0) return

    timerRef.current = setInterval(() => {
      setCooldown((seconds) => (seconds <= 1 ? 0 : seconds - 1))
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [cooldown])

  // Starting over should not leave the previous attempt's code on screen.
  useEffect(() => {
    if (open) return

    setStep("request")
    setCode("")
    setNewPin("")
    setConfirmPin("")
    setError("")
    setMaskedPhone("")
  }, [open])

  const handleRequestCode = async () => {
    setError("")
    setIsSending(true)

    try {
      const response = await requestPinResetCode({ userID: token })

      if (response.status === "Success") {
        setMaskedPhone(response.phone ?? "")
        setStep("verify")
        setCooldown(60)
        toast.success(response.message)
      } else {
        setError(response.message)
      }
    } catch (err) {
      console.error("Error requesting PIN reset code:", err)
      setError("Could not send the code. Please check your connection and try again.")
    } finally {
      setIsSending(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code.trim()) {
      setError("Enter the code sent to your phone")
      return
    }

    if (!/^\d{4,6}$/.test(newPin)) {
      setError("PIN must be 4 to 6 digits")
      return
    }

    if (newPin !== confirmPin) {
      setError("PINs do not match")
      return
    }

    setIsResetting(true)

    try {
      const response = await resetWithdrawalPin({
        userID: token,
        code: code.trim(),
        newPin,
      })

      if (response.status === "Success") {
        toast.success(response.message)
        onOpenChange(false)
        onSuccess()
      } else {
        setError(response.message)
      }
    } catch (err) {
      console.error("Error resetting PIN:", err)
      setError("Could not reset your PIN. Please try again.")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto rounded-2xl">
        <DialogHeader>
          <div className="w-14 h-14 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center">
            {step === "request" ? (
              <LockPasswordIcon size={28} className="text-primary" />
            ) : (
              <MessageNotification01Icon size={28} className="text-primary" />
            )}
          </div>
          <DialogTitle className="text-center">
            {step === "request" ? "Reset Withdrawal PIN" : "Enter Verification Code"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === "request"
              ? "We will text a verification code to the phone number registered on your account."
              : maskedPhone
                ? `Enter the 6-digit code sent to ${maskedPhone}, then choose a new PIN.`
                : "Enter the code we sent you, then choose a new PIN."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">{error}</div>
        )}

        {step === "request" ? (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
              <p className="text-sm text-orange-700">
                Only do this if you have forgotten your PIN. Your withdrawal phone number and
                account name stay unchanged.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1 h-12 font-semibold"
                onClick={handleRequestCode}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Code"}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resetCode">Verification Code *</Label>
              <Input
                id="resetCode"
                name="resetCode"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="h-12 text-center text-lg tracking-[0.4em]"
              />
              <button
                type="button"
                onClick={handleRequestCode}
                disabled={cooldown > 0 || isSending}
                className="text-sm text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                {cooldown > 0 ? `Resend code in ${cooldown}s` : "Didn't get it? Resend code"}
              </button>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-2">
              <Label htmlFor="resetNewPin">New PIN *</Label>
              <PasswordInput
                id="resetNewPin"
                name="resetNewPin"
                value={newPin}
                onChange={(value) => setNewPin(value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter new 4-6 digit PIN"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resetConfirmPin">Confirm New PIN *</Label>
              <PasswordInput
                id="resetConfirmPin"
                name="resetConfirmPin"
                value={confirmPin}
                onChange={(value) => setConfirmPin(value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Confirm your new PIN"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-12 font-semibold" disabled={isResetting}>
                {isResetting ? "Resetting..." : "Reset PIN"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
