"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import { LockPasswordIcon, CheckmarkCircle01Icon } from "hugeicons-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Topbar from "@/components/shared/topbar"
import { updatePassword } from "@/lib/backend/actions"
import { useMainStore } from "@/lib/stores/use-main-store"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const token = useMainStore((state) => state.token)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password")
      return
    }

    setIsLoading(true)
    try {
      const response = await updatePassword({userID: token, oldPassword: currentPassword, newPassword, confirmPassword})
      if(response.status == "Success"){
        toast.success(response.message)
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          router.push("/profile")
        }, 2000)
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Password reset failed:", error)
      setError("Failed to reset password. Please try again.")
    }finally {
      setIsLoading(false)
    }
    
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar title="Reset Password" backBtn />

      <div className="flex-1 px-6 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <LockPasswordIcon size={40} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Change Your Password</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Enter your current password and choose a new secure password
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center mb-6">{error}</div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="Enter current password"
            />
          </div>

          <div className="h-px bg-gray-200 my-6" />

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <PasswordInput
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Enter new password"
            />
            <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
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

          <div className="pt-4">
            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>

        {/* Password Requirements */}
        <div className="mt-8 p-4 bg-muted rounded-xl">
          <h3 className="font-semibold mb-3 text-sm">Password Requirements:</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${newPassword.length >= 6 ? "bg-green-500" : "bg-gray-300"}`} />
              At least 6 characters
            </li>
            <li className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${newPassword !== currentPassword && newPassword.length > 0 ? "bg-green-500" : "bg-gray-300"}`}
              />
              Different from current password
            </li>
            <li className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${newPassword === confirmPassword && confirmPassword.length > 0 ? "bg-green-500" : "bg-gray-300"}`}
              />
              Passwords match
            </li>
          </ul>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="max-w-sm mx-auto rounded-2xl">
          <AlertDialogHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckmarkCircle01Icon size={32} className="text-green-600" />
            </div>
            <AlertDialogTitle className="text-center">Password Updated!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your password has been changed successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
