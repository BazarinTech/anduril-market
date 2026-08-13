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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-6 text-center rounded-b-[2rem]">
        <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
          <img src="/favicon.ico" alt="Sanderson Farms" className="w-12 h-12 object-contain" />
        </div>
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-primary-foreground/80 mt-1">Join Sanderson Farms today</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8">
        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Phone Number
            </Label>
            <div className="relative">
              <SmartPhone01Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712345678"
                className="pl-10 h-12 border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground font-medium">
              Full Name
            </Label>
            <div className="relative">
              <UserIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Richard Lincoln"
                className="pl-10 h-12 border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail01Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lincoln@example.com"
                className="pl-10 h-12 border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <PasswordInput id="password" value={password} onChange={setPassword} placeholder="Create a password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground font-medium">
              Confirm Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
