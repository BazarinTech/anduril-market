"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import { SmartPhone01Icon, LockPasswordIcon } from "hugeicons-react"
import { auth } from "@/lib/backend/auth"
import { useMainStore } from "@/lib/stores/use-main-store"
import { toast } from "sonner"
import { AuthShell } from "@/components/auth/auth-shell"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!phone || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!/^0\d{9}$/.test(phone) && !/^254\d{9}$/.test(phone)) {
      setError("Please enter a valid phone number")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      const response = await auth({phone, password, type: 'login'})
      if (response.status !== "Success") {
        setError(response.message || "Login failed")
        return
      }
      toast.success(response.message || "Login successful")
      const loginState = useMainStore.getState().loginState
      loginState()
      sessionStorage.setItem('sf_show_welcome', 'true')
      router.push("/home")
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login. Please try again.")
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Your plots kept working while you were away."
      home="/register"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleLogin} className="space-y-5">
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
          <Label htmlFor="password" className="text-foreground font-medium">
            Password
          </Label>
          <div className="relative">
            <LockPasswordIcon
              size={18}
              className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
            />
            <div className="[&_input]:h-12 [&_input]:rounded-xl [&_input]:pl-11">
              <PasswordInput value={password} onChange={setPassword} placeholder="Enter your password" />
            </div>
          </div>
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="h-12 w-full rounded-4xl text-base font-semibold" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  )
}
