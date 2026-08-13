"use client"

import { useState } from "react"
import Image from "next/image"
import { Speaker01Icon } from "hugeicons-react"
import { Button } from "@/components/ui/button"
import { PromotionDialog } from "./promotion-dialog"
import { useCurrency } from "@/lib/hooks/use-currency"

interface OrderCardProps {
  name: string
  image: string
  cycle: number
  total: string
  purchaseDate: string
  status: string,
  daily: number
  roll: number
  orderID: ID
}

export function OrderCard({ name, image, cycle, total, roll, status, daily, orderID }: OrderCardProps) {
  const [isPromoting, setIsPromoting] = useState(false)
  const src = image
  ? `https://sanderson.xgramm.com/admin/uploads/${image}`
  : "/placeholder.svg";

  return (
    <>
      <div className="rounded-xl bg-background p-4 shadow-sm border border-border w-full">
        <h3 className="mb-3 text-lg font-bold text-foreground">{name}</h3>

        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg" >
            <Image src={src} alt={name} fill className="object-cover" unoptimized={src.startsWith("https://sanderson.xgramm.com")}/>
            {status === "Expired" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rotate-[-15deg] rounded bg-destructive px-2 py-0.5 text-xs font-bold text-white">
                  EXPIRED
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col justify-center space-y-1">
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Daily Income:</span>
              <span className="text-sm font-semibold text-primary">{useCurrency(daily)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Cycle:</span>
              <span className="text-sm font-semibold text-foreground">{cycle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Earned so far:</span>
              <span className="text-sm font-semibold text-primary">{useCurrency(total)}</span>
            </div>
          </div>
        </div>

        {status === "Active" && (
          <Button
            onClick={() => setIsPromoting(true)}
            className="mt-4 w-full rounded-full  from-primary to-accent py-6 font-semibold text-primary-foreground hover:opacity-90"
            disabled={isPromoting || roll == 0}
          >
            <Speaker01Icon className="mr-2 h-5 w-5" />
            {roll == 0 ? "Please come back later" : `Claim Income`}
          </Button>
        )}
      </div>

      <PromotionDialog isOpen={isPromoting} onComplete={() => setIsPromoting(false)} productName={name} orderID={orderID} />
    </>
  )
}
