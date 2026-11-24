import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight02Icon,
  PlayIcon,
  NextIcon,
  PreviousIcon,
  Coins01Icon,
  Calendar03Icon,
  MoneyReceiveSquareIcon,
} from "hugeicons-react"
import { StageScene, StoryVignette } from "@/components/shared/stage-scene"

// What every track card shows before you rent it. Labels only, on purpose:
// the real figures come from the catalogue, and a made-up number here would
// read as a promise.
const cardRows = [
  { icon: Coins01Icon, label: "Rental price" },
  { icon: Calendar03Icon, label: "Rental term" },
  { icon: MoneyReceiveSquareIcon, label: "Earns daily" },
]

/**
 * The opening: a full-bleed stage with the promise centred on it, and a
 * player card that hangs over the bottom edge into the page below -- the one
 * object on the landing page that looks like the product itself.
 */
export function HeroSection() {
  return (
    <section className="bg-hero relative isolate overflow-hidden px-6 pt-20 pb-44 sm:pt-28">
      <StageScene className="absolute inset-0 -z-10 opacity-80" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-brand-bright ring-1 ring-white/15">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          Welcome to Musically
        </p>

        <h1 className="mt-6 text-4xl font-semibold text-balance text-ink-foreground sm:text-6xl">
          Rent the music
          <span className="block text-brand-bright">that pays you back</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-lg text-pretty text-ink-foreground/70">
          Pick a track, rent it for its term, and collect what it earns every day. M-Pesa in, M-Pesa out.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
            <Link href="/register">
              Start listening
              <ArrowRight02Icon className="ml-1 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 px-7 text-base text-ink-foreground ring-1 ring-white/20 hover:bg-white/10 hover:text-ink-foreground"
          >
            <a href="#how-it-works">How it works</a>
          </Button>
        </div>
      </div>

      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </section>
  )
}

/** The player card that overlaps the hero's bottom edge. */
export function PlayerCard() {
  return (
    <div className="relative z-10 mx-auto -mt-32 max-w-xl px-6">
      <div className="overflow-hidden rounded-3xl bg-card shadow-premium ring-1 ring-border/70">
        <div className="flex gap-4 p-4 sm:p-5">
          <div className="bg-hero relative size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28">
            <StoryVignette variant="play" className="absolute inset-0" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
            <div>
              <p className="text-eyebrow text-primary">Now playing</p>
              <p className="mt-1 truncate text-lg font-semibold text-foreground">Your next track</p>
              <p className="text-sm text-muted-foreground">Rented from the Music Library</p>
            </div>
            <div className="mt-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-2/5 rounded-full bg-primary" />
              </div>
              <div className="mt-3 flex items-center gap-5 text-muted-foreground">
                <PreviousIcon className="size-4" />
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <PlayIcon className="size-4" />
                </span>
                <NextIcon className="size-4" />
              </div>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-3 divide-x divide-border border-t border-border">
          {cardRows.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 px-2 py-3 text-center">
              <Icon className="size-4 text-primary" />
              <dt className="text-xs font-medium text-foreground">{label}</dt>
            </div>
          ))}
        </dl>
        <p className="border-t border-border bg-muted/50 px-4 py-2.5 text-center text-xs text-muted-foreground">
          All three are shown on every track before you rent it.
        </p>
      </div>
    </div>
  )
}
