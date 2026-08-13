"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import { SmartPhone01Icon, Mail01Icon, LockPasswordIcon, CheckmarkCircle01Icon } from "hugeicons-react"
import { VerificationCodeInput } from "@/components/auth/verification-input"
import { requestVerificationCode, resetPassword, verifyCode } from "@/lib/backend/actions"
import { toast } from "sonner"

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

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 px-6 py-8">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center mb-6">{error}</div>
        )}

        {/* Step 1: Phone */}
        {step === "phone" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <SmartPhone01Icon size={40} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Reset Your Password</h2>
              <p className="text-muted-foreground text-sm mt-2">
                Enter your registered phone number to receive a verification code
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <SmartPhone01Icon
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712345678"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button onClick={handleRequestCode} className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>

            <div className="text-center">
              <Link href="/login" className="text-primary text-sm hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Verify Code */}
        {step === "verify" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail01Icon size={40} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Enter Verification Code</h2>
              <p className="text-muted-foreground text-sm mt-2">We sent a 6-digit code to {phone}</p>
            </div>

            <VerificationCodeInput value={verificationCode} onChange={setVerificationCode} />

            <Button
              onClick={handleVerifyCode}
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-muted-foreground text-sm">Resend code in {countdown}s</p>
              ) : (
                <button
                  onClick={() => {
                    startCountdown()
                    handleRequestCode()
                  }}
                  className="text-primary text-sm hover:underline"
                >
                  Resend verification code
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <LockPasswordIcon size={40} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Create New Password</h2>
              <p className="text-muted-foreground text-sm mt-2">Your new password must be at least 6 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <PasswordInput
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={setNewPassword}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm new password"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}

        {/* Success */}
        {step === "success" && (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <CheckmarkCircle01Icon size={48} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Password Reset Successful</h2>
              <p className="text-muted-foreground mt-2">
                Your password has been changed successfully. You can now login with your new password.
              </p>
            </div>
            <Button onClick={() => router.push("/login")} className="w-full h-12 text-lg font-semibold">
              Go to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
