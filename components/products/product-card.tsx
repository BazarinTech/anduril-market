"use client"

import Image from "next/image"
import { ArrowRight01Icon, Loading01Icon } from "hugeicons-react"
import { useCurrency } from "@/lib/hooks/use-currency"
import { useState } from "react";
import { toast } from "sonner";
import { makeInvestment } from "@/lib/backend/actions";
import { useMainStore } from "@/lib/stores/use-main-store";
import { productImageUrl } from "@/lib/media/image-url";

/**
 * A champion's roster card.
 *
 * The portrait sits in an arena arch -- the same arch that runs along the
 * banners -- with the name and figures alongside rather than stacked beneath.
 * The old layout was a full-width square image above a 2x2 grid, which made
 * one product fill the whole screen; this fits two and reads as a lineup.
 *
 * Daily income is the hero number because it is what the card is chosen on.
 */
export function ProductCard({ID, name, image, image_url, max, duration, returns, order_limit, tier }: Product) {
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
    <article data-tour="product-card" className="relative overflow-hidden rounded-2xl bg-card shadow-premium ring-1 ring-border/70">
      <div className="flex gap-4 p-4">
        {/* Portrait in an arena arch */}
        <div className="relative w-28 shrink-0">
          <div className="bg-hero relative h-36 overflow-hidden rounded-t-full rounded-b-2xl ring-1 ring-gold/30">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loading01Icon className="size-6 animate-spin text-gold/60" />
              </div>
            )}
            <Image
              src={src || "/placeholder.svg"}
              alt={name}
              fill
              sizes="112px"
              className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          {tier && (
            <span className="text-eyebrow absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2.5 py-1 text-brand-bright ring-1 ring-gold/30">
              {tier}
            </span>
          )}
        </div>

        {/* Name and figures */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-base font-semibold tracking-wide text-foreground uppercase">{name}</h3>
            <span className="text-eyebrow shrink-0 rounded-full bg-accent px-2.5 py-1 text-accent-foreground">
              {duration}d
            </span>
          </div>

          <div className="brand-hairline my-3" />

          <p className="text-eyebrow text-muted-foreground">Daily</p>
          <p className="text-2xl font-semibold text-primary tabular-nums">{useCurrency(returns)}</p>

          <dl className="mt-3 space-y-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-xs text-muted-foreground">Stake</dt>
              <dd className="text-sm font-semibold text-foreground tabular-nums">{useCurrency(max)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-xs text-muted-foreground">Total</dt>
              <dd className="text-sm font-semibold text-foreground tabular-nums">
                {useCurrency(Number(returns) * Number(duration))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Action rail */}
      <div className="flex items-center gap-3 border-t border-border bg-muted/40 px-4 py-3">
        <span className="text-eyebrow shrink-0 text-muted-foreground">
          Limit {order_limit}
        </span>
        <button
          className="ml-auto flex h-11 flex-1 items-center justify-center gap-2 rounded-4xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
          disabled={isLoading}
          onClick={handleBuyProduct}
        >
          {isLoading ? <>Claiming... <Loading01Icon className="size-4 animate-spin" /></> : <>Get Package <ArrowRight01Icon className="size-4" /></>}
        </button>
      </div>
    </article>
  )
}
