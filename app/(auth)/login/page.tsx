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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-6 text-center rounded-b-[2rem]">
        <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
          <img src="/favicon.ico" alt="Sanderson Farms" className="w-12 h-12 object-contain" />
        </div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-primary-foreground/80 mt-1">Login to your account</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8">
        <form onSubmit={handleLogin} className="space-y-6">
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
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <LockPasswordIcon
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
              />
              <div className="[&_input]:pl-10">
                <PasswordInput value={password} onChange={setPassword} placeholder="Enter your password" />
              </div>
            </div>
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
