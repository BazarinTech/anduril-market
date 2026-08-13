import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight02Icon } from "hugeicons-react"

export function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
          Ready to start earning?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
          Join thousands of workers already making money their way. Sign up today and get started in minutes.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8 text-base">
            <Link href="/register">
              Create free account
              <ArrowRight02Icon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
