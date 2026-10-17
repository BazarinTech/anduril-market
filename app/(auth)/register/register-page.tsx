"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import { SmartPhone01Icon, UserIcon, Mail01Icon } from "hugeicons-react"
import { toast } from "sonner"
import { auth } from "@/lib/backend/auth"
import { useInviteCode } from "@/lib/hooks/use-invite-code"
import { useMainStore } from "@/lib/stores/use-main-store"
import { AuthShell } from "@/components/auth/auth-shell"

export default function RegisterPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [uplineId, setUplineID] = useState("")
  const searchParams = useSearchParams()
  const upline = searchParams.get("inviteCode")
  const { decode } = useInviteCode()

  useEffect(() => {
    if (upline) {
      setUplineID(String(decode(upline)))
    }
  }, [upline])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!/^0\d{9}$/.test(phone) && !/^254\d{9}$/.test(phone)) {
      setError("Please enter a valid phone number")
      return
    }

    if (!fullName || !password || !confirmPassword || !email) {
      setError("Please fill in all required fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const response = await auth({ email, password, confirmPassword, phone, name: fullName, type: "register", upline: uplineId })
      if (response.status == "Success") {
        const loginState = useMainStore.getState().loginState
        loginState()
        toast.success(response.message || "Registration successful")
        sessionStorage.setItem('sf_show_welcome', 'true')
        router.push("/home")
      } else {
        toast.error(response.message || "Registration failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred during registration.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthShell
      title="Join the farm"
      subtitle="Your own plot, in about a minute."
      home="/login"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-destructive/10 p-3 text-center text-sm text-destructive">{error}</div>
        )}

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-medium">
            Phone Number
          </Label>
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

        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-foreground font-medium">
            Full Name
          </Label>
          <div className="relative">
            <UserIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="h-12 rounded-xl pl-11 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail01Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-xl pl-11 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Password
          </Label>
          <div className="[&_input]:h-12 [&_input]:rounded-xl">
            <PasswordInput id="password" value={password} onChange={setPassword} placeholder="Create a password" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground font-medium">
            Confirm Password
          </Label>
          <div className="[&_input]:h-12 [&_input]:rounded-xl">
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <Button type="submit" className="mt-2 h-12 w-full rounded-4xl text-base font-semibold" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </AuthShell>
  )
}
