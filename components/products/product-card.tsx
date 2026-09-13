"use client"

import Image from "next/image"
import { ArrowRight01Icon, Loading01Icon } from "hugeicons-react"
import { Progress } from "@/components/ui/progress"
import { useCurrency } from "@/lib/hooks/use-currency"
import { useState } from "react";
import { toast } from "sonner";
import { makeInvestment } from "@/lib/backend/actions";
import { useMainStore } from "@/lib/stores/use-main-store";
import { productImageUrl } from "@/lib/media/image-url";

export function ProductCard({ID, name, image, image_url, max, duration, returns, order_limit }: Product) {
  const token = useMainStore((state) => state.token);
  const fetchMainDetails = useMainStore((state) => state.fetchMainDetails);
  const [isLoading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // The backend resolves this now -- it is the only side that knows whether
  // images sit on disk, in a public bucket, or behind a presigned URL.
  const src = productImageUrl(image_url, image);

  const handleBuyProduct = async () => {
    setLoading(true);
    try {
      const response = await makeInvestment({userID: token, prodID: ID, amount: String(max)});
      if(response.status === "Success") {
        toast.success(response.message || "Product purchased successfully!");
        fetchMainDetails(token);
      } else {
        toast.error(response.message || "Failed to buy product. Please try again.");
      }
    } catch (error) {
      console.error("Error buying product:", error);
      toast.error("Failed to buy product. Please try again.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-premium ring-1 ring-border/70 w-full flex-col justify-center items-center">
      {/* Product Name */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <span className="text-eyebrow rounded-full bg-accent px-2.5 py-1 text-accent-foreground">{duration} days</span>
      </div>

      {/* Product Info Row */}
      <div className="flex flex-col justify-center items-center w-full gap-4 mb-4">
        {/* Product Image */}
        <div className="w-full max-w-80 overflow-hidden rounded-lg bg-muted shrink-0 relative">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <Loading01Icon className="w-8 h-8 text-muted-foreground animate-spin" />
            </div>
          )}
          {/*
            `unoptimized` is gone: it was disabling Next's optimiser for the
            only host these images used to come from, which meant every card
            downloaded the full-size original. With the storage hosts declared
            in next.config, Next now resizes once and serves the variant from
            its own cache.
          */}
          <Image
            src={src || "/placeholder.svg"}
            alt={name}
            width={320}
            height={320}
            sizes="320px"
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Details */}
        <dl className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-lg bg-border ring-1 ring-border">
          <div className="bg-card px-3 py-2.5">
            <dt className="text-[11px] text-muted-foreground">Price</dt>
            <dd className="text-sm font-semibold text-foreground tabular-nums">{useCurrency(max)}</dd>
          </div>
          <div className="bg-card px-3 py-2.5">
            <dt className="text-[11px] text-muted-foreground">Cycle</dt>
            <dd className="text-sm font-semibold text-foreground tabular-nums">{duration} Days</dd>
          </div>
          <div className="bg-card px-3 py-2.5">
            <dt className="text-[11px] text-muted-foreground">Daily Income</dt>
            <dd className="text-sm font-semibold text-primary tabular-nums">{useCurrency(returns)}</dd>
          </div>
          <div className="bg-card px-3 py-2.5">
            <dt className="text-[11px] text-muted-foreground">Total Income</dt>
            <dd className="text-sm font-semibold text-primary tabular-nums">{useCurrency(Number(returns) * Number(duration))}</dd>
          </div>
        </dl>
      </div>

      {/* Progress Bar and Buy Button */}
      <div className="gap-2">
        {/* Progress Section */}
        <div className="flex-1 space-y-1 mb-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Order Limit</span>
            <span>{order_limit}</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Buy Button */}
        <button className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60" disabled={isLoading} onClick={handleBuyProduct}>
        {isLoading ? <>Processing... <Loading01Icon className="w-5 h-5 animate-spin" /></> : <>Get Package <ArrowRight01Icon className="w-5 h-5" /></>}
          
        </button>
      </div>
    </div>
  )
}
