"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Rocket01Icon, SparklesIcon } from "hugeicons-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { useMainStore } from "@/lib/stores/use-main-store"
import { claimEarnings } from "@/lib/backend/actions"

interface PromotionDialogProps {
  isOpen: boolean
  onComplete: () => void
  productName: string
  orderID: ID
}

export function PromotionDialog({ isOpen, onComplete, productName, orderID }: PromotionDialogProps) {
 const [progress, setProgress] = useState(0)
  const fetchMainDetails = useMainStore((s) => s.fetchMainDetails)
  const token = useMainStore((s) => s.token)

  const didFinishRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClaimIncome = useCallback(async () => {
    try {
      const response = await claimEarnings({ userID: token, orderID })
      if (response.status === "Success") toast.success(response.message || "Income claimed successfully!")
      else toast.error(response.message)
    } catch (e) {
      console.error("Error claiming income:", e)
      toast.error("Failed to claim income. Please try again.")
    } finally {
      fetchMainDetails(token)
    }
  }, [token, orderID, fetchMainDetails])

  useEffect(() => {
    if (!isOpen) {
      setProgress(0)
      didFinishRef.current = false
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      return
    }

    // when opened, allow one finish
    didFinishRef.current = false

    const duration = 3000
    const interval = 30
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment

        if (next >= 100) {
          clearInterval(timer)

          // Guard: finish only once per open
          if (!didFinishRef.current) {
            didFinishRef.current = true
            timeoutRef.current = setTimeout(() => {
              onComplete()
              handleClaimIncome()
            }, 200)
          }

          return 100
        }

        return next
      })
    }, interval)

    return () => {
      clearInterval(timer)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isOpen, onComplete, handleClaimIncome])
  
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-sm gap-0 overflow-hidden p-0 [&>button]:hidden">
        <AlertDialogHeader className="bg-hero relative block space-y-0 px-6 pt-6 pb-5 text-left sm:text-left">
          <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <Rocket01Icon className="size-5 text-brand-bright" />
          </div>
          <p className="text-eyebrow text-brand-bright">Claim in progress</p>
          <AlertDialogTitle className="mt-1 text-lg font-semibold text-ink-foreground">Claiming your income</AlertDialogTitle>
          <AlertDialogDescription className="mt-0.5 text-sm text-ink-foreground/70">
            {productName}
          </AlertDialogDescription>
          <div className="brand-hairline absolute inset-x-0 bottom-0" />
        </AlertDialogHeader>

        <div className="px-6 pt-5 pb-6">
          <Progress value={progress} className="h-1.5" />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Processing</span>
            <span className="font-semibold text-primary tabular-nums">{Math.round(progress)}%</span>
          </div>

          {/*
            This copy used to promise the product was "being featured to
            thousands of potential investors" and that promoted products "earn
            up to 25% more". Nothing behind this dialog does either: it is a
            timer followed by a single claimEarnings call. The copy now says
            what actually happens.
          */}
          <div className="mt-5 space-y-3 rounded-lg bg-muted/70 p-4">
            <div className="flex items-start gap-3">
              <SparklesIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm text-foreground">Today&apos;s income for this product is being claimed.</p>
            </div>
            <div className="flex items-start gap-3">
              <Rocket01Icon className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">Your balance refreshes as soon as this completes.</p>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">Please keep this screen open.</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
