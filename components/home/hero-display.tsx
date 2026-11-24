"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { MusicallyLogo } from "@/components/shared/brand-logo"
import { StageScene, VinylSilhouette } from "@/components/shared/stage-scene"

// The room keeps its own hours, so the panel greets by the clock rather than
// with one fixed line.
const HOURS = [
  { from: 5, greeting: "Good morning", line: "First play of the day. Your tracks are on." },
  { from: 12, greeting: "Good afternoon", line: "Mid-set. Every track you rent is still spinning." },
  { from: 17, greeting: "Good evening", line: "Lights going down. The day's plays are in." },
  { from: 21, greeting: "Good night", line: "The room is quiet. Your tracks keep playing." },
]

function indexForHour(hour: number) {
  // Before 05:00 the day has not begun, so it belongs to the last entry.
  if (hour < HOURS[0].from) return HOURS.length - 1
  return HOURS.reduce((acc, h, i) => (hour >= h.from ? i : acc), 0)
}

// The clock is outside React, and the server has no business guessing the
// reader's. Subscribing to nothing renders the morning line on the server and
// the true hour the moment the page hydrates -- no state, no mismatch.
const subscribeToNothing = () => () => {}

/**
 * The home display: your stage, as a picture.
 *
 * No figures here by design -- the money lives one tap away in the wallet and
 * on the account page. This panel exists to open the day, so it carries the
 * record, the hour and your name, and nothing else.
 *
 * The photograph loads from /hero.jpg. Drop one in and it is used with no code
 * change; until then the drawn stage stands in, so it is never empty.
 */
export function HeroDisplay({ name }: { name?: string }) {
  const [hasPhoto, setHasPhoto] = useState(true)
  const moment = HOURS[
    useSyncExternalStore(subscribeToNothing, () => indexForHour(new Date().getHours()), () => 0)
  ]

  const firstName = name?.trim().split(/\s+/)[0]

  return (
    <section className="bg-hero relative isolate overflow-hidden rounded-3xl shadow-premium" data-tour="home-banner">
      <div className="relative h-60 w-full sm:h-64">
        {hasPhoto ? (
          <Image
            src="/hero.jpg"
            alt="Your music on stage"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-cover"
            onError={() => setHasPhoto(false)}
          />
        ) : (
          <>
            <StageScene className="absolute inset-0" />
            <VinylSilhouette className="absolute top-5 right-4 h-24 text-brand-bright/70" />
          </>
        )}

        {/* Keeps the words legible whatever photograph is dropped in. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

        <div className="absolute inset-x-5 top-5">
          <MusicallyLogo size="sm" inverse />
        </div>

        <div className="absolute inset-x-5 bottom-5">
          <p className="text-eyebrow text-brand-bright">{moment.greeting}</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink-foreground">
            {firstName ? `Karibu, ${firstName}` : "Karibu backstage"}
          </h2>
          <p className="mt-1.5 max-w-[16rem] text-sm leading-snug text-ink-foreground/70">{moment.line}</p>
        </div>
      </div>

      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </section>
  )
}
