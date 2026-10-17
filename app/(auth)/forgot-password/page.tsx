"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import { SmartPhone01Icon, CheckmarkCircle01Icon } from "hugeicons-react"
import { VerificationCodeInput } from "@/components/auth/verification-input"
import { requestVerificationCode, resetPassword, verifyCode } from "@/lib/backend/actions"
import { toast } from "sonner"
import { AuthShell } from "@/components/auth/auth-shell"

type Step = "phone" | "verify" | "reset" | "success"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [isVerified, setIsVerified] = useState(false)

  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleRequestCode = async () => {
      setError("")
  
      if (!/^0\d{9}$/.test(phone) && !/^254\d{9}$/.test(phone)) {
        setError("Please enter a valid phone number")
        return
      }
  
      setIsLoading(true)
      try {
        const response = await requestVerificationCode({phone})
        if (response.status == 'Success') {
          toast.success("Verification code sent successfully")
          setStep("verify")
        } else {
          setError(response.message || "Failed to send verification code")
        }
      } catch (error) {
        console.error(error)
        toast.error("An error occurred while sending the verification code.")
      }finally {  
        setIsLoading(false)
  
        startCountdown()
      }
    }
  
    const handleVerifyCode = async () => {
      setError("")
  
      if (verificationCode.length !== 6) {
        setError("Please enter the 6-digit verification code")
        return
      }
  
      setIsLoading(true)
      try {
        const response = await verifyCode({phone, code: verificationCode})
        if (response.status == 'Success') {
          toast.success("Phone number verified successfully")
          setIsVerified(true)
          setStep("reset")
        } else {
          setError(response.message || "Invalid verification code")
        }
      } catch (error) {
        console.error(error)
        toast.error("An error occurred during verification.")
      }finally {
      setIsLoading(false)
      }
      
    }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!isVerified) {
      setError("Please verify your phone number first")
      return
    }

    setIsLoading(true)
    try {
      const response = await resetPassword({phone, code: verificationCode, newPassword})
      if (response.status == 'Success') {
        toast.success("Password reset successfully")
        setStep("success")
      } else {
        setError(response.message || "Failed to reset password")
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password.")
      console.error(error)
    }finally {
      setIsLoading(false)
    }
  }

  // The shell carries the heading, so each step only states where it is.
  const copy = {
    phone: { title: "Reset your password", subtitle: "We will send a six-digit code to your number." },
    verify: { title: "Check your phone", subtitle: `A six-digit code is on its way to ${phone}.` },
    reset: { title: "Choose a new password", subtitle: "Six characters or more." },
    success: { title: "You are back in", subtitle: "Sign in with your new password." },
  }[step]

  return (
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      footer={
        step === "success" ? null : (
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Back to sign in
          </Link>
        )
      }
    >
      {error && (
        <div className="mb-5 rounded-xl bg-destructive/10 p-3 text-center text-sm text-destructive">{error}</div>
      )}

      {step === "phone" && (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
            <div className="relative">
              <SmartPhone01Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712345678"
                className="h-12 rounded-xl pl-11 text-sm"
              />
            </div>
          </div>

          <Button onClick={handleRequestCode} className="h-12 w-full rounded-4xl text-base font-semibold" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Verification Code"}
          </Button>
        </div>
      )}

      {step === "verify" && (
        <div className="space-y-5">
          <VerificationCodeInput value={verificationCode} onChange={setVerificationCode} />

          <Button
            onClick={handleVerifyCode}
            className="h-12 w-full rounded-4xl text-base font-semibold"
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-muted-foreground tabular-nums">Resend code in {countdown}s</p>
            ) : (
              <button
                onClick={() => {
                  startCountdown()
                  handleRequestCode()
                }}
                className="text-sm text-primary hover:underline"
              >
                Resend verification code
              </button>
            )}
          </div>
        </div>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-foreground font-medium">New Password</Label>
            <div className="[&_input]:h-12 [&_input]:rounded-xl">
              <PasswordInput
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={setNewPassword}
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm New Password</Label>
            <div className="[&_input]:h-12 [&_input]:rounded-xl">
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <Button type="submit" className="h-12 w-full rounded-4xl text-base font-semibold" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}

      {step === "success" && (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success-soft">
            <CheckmarkCircle01Icon size={34} className="text-success" />
          </div>
          <Button onClick={() => router.push("/login")} className="h-12 w-full rounded-4xl text-base font-semibold">
            Go to Sign in
          </Button>
        </div>
      )}
    </AuthShell>
  )
}
