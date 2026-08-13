'use client'

import { useEffect } from "react"
import { useMainStore } from "@/lib/stores/use-main-store"
import { usePathname } from "next/navigation"

export default function ClientLoginInitializer() {
  const loginState = useMainStore((state) => state.loginState)

  useEffect(() => {
    loginState()
  }, [loginState]) 

  return null
}