"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface VerificationCodeInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
}

export function VerificationCodeInput({ length = 6, value, onChange }: VerificationCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""))

  useEffect(() => {
    const newDigits = value.split("").slice(0, length)
    while (newDigits.length < length) newDigits.push("")
    setDigits(newDigits)
  }, [value, length])

  const handleChange = (index: number, digitValue: string) => {
    if (!/^\d*$/.test(digitValue)) return

    const newDigits = [...digits]
    newDigits[index] = digitValue.slice(-1)
    setDigits(newDigits)
    onChange(newDigits.join(""))

    if (digitValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    const newDigits = pastedData.split("")
    while (newDigits.length < length) newDigits.push("")
    setDigits(newDigits)
    onChange(newDigits.join(""))
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus()
  }

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-semibold border-gray-300 focus:border-primary focus:ring-primary"
        />
      ))}
    </div>
  )
}
