"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ViewIcon, ViewOffIcon } from "hugeicons-react"

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  name?: string
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
  id = "password",
  name = "password",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPassword ? <ViewOffIcon size={20} /> : <ViewIcon size={20} />}
      </button>
    </div>
  )
}
