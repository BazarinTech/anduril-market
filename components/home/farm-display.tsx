"use client"

import { useState } from "react"
import Image from "next/image"
import { useMainStore } from "@/lib/stores/use-main-store"
import { useCurrency } from "@/lib/hooks/use-currency"
import { CloudFarmerLogo } from "@/components/shared/brand-logo"
import { FarmScene, CowSilhouette } from "@/components/shared/farm-scene"

/**
 * The home display: the herd, then today's figures.
 *
 * Carries the story the page tells -- this is your farm, here is what it made
 * today -- with the numbers doing the talking instead of a paragraph.
 *
 * The photograph loads from /cow.jpg. Drop one in and it is used with no code
 * change; until then the drawn pasture stands in, so the panel is never empty.
 */
export function FarmDisplay({ name }: { name?: string }) {
  const [hasPhoto, setHasPhoto] = useState(true)
  const wallet = useMainStore((s) => s.mainDetails?.wallet)
  const herd = useMainStore((s) => s.mainDetails?.user_investments?.length ?? 0)

  return (
    <section className="bg-hero relative isolate overflow-hidden rounded-2xl shadow-premium" data-tour="home-banner">
      <div className="relative h-44 w-full">
        {hasPhoto ? (
          <Image
            src="/cow.jpg"
            alt="Your herd at pasture"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-cover"
            onError={() => setHasPhoto(false)}
          />
        ) : (
          <>
            <FarmScene className="absolute inset-0" />
            <CowSilhouette className="absolute bottom-6 left-1/2 h-20 -translate-x-1/2 text-brand-bright/90" />
          </>
        )}
        {/* Keeps the wordmark legible whatever photograph is dropped in. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />

        <div className="absolute inset-x-4 top-4">
          <CloudFarmerLogo size="sm" inverse />
        </div>
        <div className="absolute inset-x-4 bottom-3">
          <p className="text-eyebrow text-brand-bright">Your farm</p>
          <h2 className="text-xl font-semibold text-ink-foreground">{name ? `Habari, ${name}` : "Welcome home"}</h2>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-px bg-white/10">
        {[
          { label: "Today", value: useCurrency(wallet?.today_income ?? 0) },
          { label: "Balance", value: useCurrency(wallet?.balance ?? 0) },
          { label: "In the field", value: String(herd) },
        ].map((stat) => (
          <div key={stat.label} className="bg-transparent px-3 py-3 text-center">
            <dd className="truncate text-sm font-semibold text-ink-foreground tabular-nums">{stat.value}</dd>
            <dt className="text-[11px] text-ink-foreground/60">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </section>
  )
}
