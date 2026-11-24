"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight01Icon } from "hugeicons-react"
import { StoryVignette, type VignetteVariant } from "@/components/shared/stage-scene"

type Story = {
  variant: VignetteVariant
  /** Photograph, if one has been dropped in. Falls back to the drawn scene. */
  photo: string
  eyebrow: string
  title: string
  href: string
}

// Four moments, in the order they happen. Read left to right they are the
// whole product -- they explain renting music without a paragraph.
const stories: Story[] = [
  { variant: "discover", photo: "/stories/discover.jpg", eyebrow: "Browse", title: "Find a track", href: "/products" },
  { variant: "rent", photo: "/stories/rent.jpg", eyebrow: "Rent it", title: "Make it yours", href: "/products" },
  { variant: "play", photo: "/stories/play.jpg", eyebrow: "Every day", title: "Collect earnings", href: "/work" },
  { variant: "payout", photo: "/stories/payout.jpg", eyebrow: "Payday", title: "Cash out", href: "/cashout" },
]

function StoryCard({ story }: { story: Story }) {
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <Link
      href={story.href}
      className="bg-hero group relative h-56 w-40 shrink-0 snap-start overflow-hidden rounded-3xl shadow-premium"
    >
      {hasPhoto ? (
        <Image
          src={story.photo}
          alt=""
          fill
          sizes="160px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasPhoto(false)}
        />
      ) : (
        <StoryVignette variant={story.variant} className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

      <div className="absolute inset-x-4 bottom-4">
        <p className="text-eyebrow text-brand-bright">{story.eyebrow}</p>
        <p className="mt-1 text-[0.9375rem] leading-snug font-semibold text-ink-foreground">{story.title}</p>
      </div>

      <span className="absolute top-4 right-4 flex size-7 items-center justify-center rounded-full bg-white/10 text-ink-foreground ring-1 ring-white/15 transition-colors group-hover:bg-primary">
        <ArrowRight01Icon size={14} />
      </span>

      <div className="brand-hairline absolute inset-x-0 bottom-0 opacity-70" />
    </Link>
  )
}

export function MusicStories() {
  return (
    <section aria-label="How a rental plays out">
      <h2 className="mb-3 px-1 text-base font-semibold text-foreground">How a rental plays out</h2>
      <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
        {stories.map((story) => (
          <StoryCard key={story.title} story={story} />
        ))}
      </div>
    </section>
  )
}
