"use client"

import Image from "next/image"
import { ArrowRight01Icon, Loading01Icon, Plant02Icon } from "hugeicons-react"
import { useCurrency } from "@/lib/hooks/use-currency"
import { useState } from "react";
import { toast } from "sonner";
import { makeInvestment } from "@/lib/backend/actions";
import { useMainStore } from "@/lib/stores/use-main-store";
import { productImageUrl } from "@/lib/media/image-url";

/**
 * A plot on the farm.
 *
 * The picture runs the full width at the top and carries the name over it, so
 * the row of cards reads as a field of plots rather than a price list. Below
 * it the figures are split by weight, not by grid: what it pays you daily is
 * the one number set large, with the stake and the full-cycle total kept
 * quietly to the right of it.
 */
export function ProductCard({ID, name, image, image_url, max, duration, returns, order_limit, tier, index }: Product & { index?: number }) {
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
    <article
      data-tour="product-card"
      className="group relative overflow-hidden rounded-3xl bg-card shadow-premium ring-1 ring-border/70"
    >
      {/* The plot itself */}
      <div className="bg-hero relative h-40 w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading01Icon className="size-6 animate-spin text-leaf/60" />
          </div>
        )}
        <Image
          src={src || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 448px"
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5" />

        {typeof index === "number" && (
          <span className="text-eyebrow absolute top-4 left-4 text-brand-bright">
            Plot {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {tier && (
          <span className="text-eyebrow absolute top-3.5 right-4 rounded-full bg-white/10 px-2.5 py-1 text-ink-foreground ring-1 ring-leaf/30">
            {tier}
          </span>
        )}

        <div className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3">
          <h3 className="truncate text-lg font-semibold tracking-wide text-ink-foreground uppercase">{name}</h3>
          <span className="shrink-0 text-xs font-medium text-ink-foreground/70 tabular-nums">{duration} days</span>
        </div>
        <div className="brand-hairline absolute inset-x-0 bottom-0" />
      </div>

      {/* What it gives back. Stacked, not side by side: a five-figure cycle
          total and a three-figure daily rate would otherwise collide. */}
      <div className="px-5 pt-4">
        <p className="text-eyebrow text-muted-foreground">Pays you daily</p>
        <p className="mt-0.5 text-3xl font-semibold text-primary tabular-nums">{useCurrency(returns)}</p>

        <div className="my-4 h-px bg-border" />

        <dl className="grid grid-cols-2 gap-3">
          <div>
            <dt className="text-xs text-muted-foreground">Stake</dt>
            <dd className="mt-0.5 text-sm font-semibold text-foreground tabular-nums">{useCurrency(max)}</dd>
          </div>
          <div className="text-right">
            <dt className="text-xs text-muted-foreground">Full cycle</dt>
            <dd className="mt-0.5 text-sm font-semibold text-foreground tabular-nums">
              {useCurrency(Number(returns) * Number(duration))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="px-5 pt-4 pb-5">
        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-4xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
          disabled={isLoading}
          onClick={handleBuyProduct}
        >
          {isLoading ? (
            <>Planting... <Loading01Icon className="size-4 animate-spin" /></>
          ) : (
            <><Plant02Icon className="size-4" /> Plant this plot <ArrowRight01Icon className="size-4" /></>
          )}
        </button>
        <p className="mt-2.5 text-center text-xs text-muted-foreground">Up to {order_limit} per farmer</p>
      </div>
    </article>
  )
}
