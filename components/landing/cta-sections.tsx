import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight02Icon } from "hugeicons-react"
import { VinylSilhouette } from "@/components/shared/stage-scene"

/** The closing band: the ask on the left, the two ways in on the right. */
export function CTASection() {
  return (
    <section id="get-started" className="scroll-mt-20 px-6 py-24">
      <div className="bg-hero relative isolate mx-auto flex max-w-6xl flex-col gap-10 overflow-hidden rounded-3xl px-8 py-14 shadow-premium md:flex-row md:items-center md:justify-between sm:px-14">
        <VinylSilhouette className="absolute -right-10 -bottom-16 -z-10 h-64 text-white/5" />

        <div className="max-w-md">
          <p className="text-eyebrow text-brand-bright">Get started</p>
          <h2 className="mt-3 text-3xl font-semibold text-balance text-ink-foreground sm:text-4xl">The stage is yours</h2>
          <p className="mt-3 text-lg text-ink-foreground/70">All you need is a phone number.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
            <Link href="/register">
              Start listening
              <ArrowRight02Icon className="ml-1 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="h-12 px-7 text-base text-ink-foreground ring-1 ring-white/20 hover:bg-white/10 hover:text-ink-foreground"
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
        <div className="brand-hairline absolute inset-x-0 bottom-0" />
      </div>
    </section>
  )
}
