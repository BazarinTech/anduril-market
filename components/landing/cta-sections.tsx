import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight02Icon } from "hugeicons-react"

export function CTASection() {
  return (
    <section id="get-started" className="scroll-mt-20 px-6 py-24">
      <div className="bg-hero relative mx-auto max-w-4xl overflow-hidden rounded-2xl px-8 py-16 text-center shadow-premium sm:px-16">
        <p className="text-eyebrow text-brand-bright">Get started</p>
        <h2 className="mt-3 text-3xl font-semibold text-balance text-ink-foreground sm:text-4xl">
          Your Bima account is a minute away
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-foreground/70">
          Create an account with your phone number and set up your M-Pesa wallet when you are ready.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="h-12 bg-white px-7 text-base font-semibold text-ink hover:bg-white/90">
            <Link href="/register">
              Create account
              <ArrowRight02Icon className="ml-1 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="h-12 px-7 text-base text-ink-foreground ring-1 ring-white/15 hover:bg-white/10 hover:text-ink-foreground"
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
        <div className="brand-hairline absolute inset-x-0 bottom-0" />
      </div>
    </section>
  )
}
