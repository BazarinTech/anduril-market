import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight02Icon, LockPasswordIcon, SmartPhone01Icon, Invoice01Icon } from "hugeicons-react"
import { BrandBanner } from "@/components/shared/brand-banner"

// Each of these is something the app demonstrably does. They replace a
// "Trusted by 5,000+ workers" line and a "Now hiring across 50+ cities" badge,
// neither of which anything in the product backs up.
const assurances = [
  { icon: SmartPhone01Icon, label: "M-Pesa top-ups & withdrawals" },
  { icon: LockPasswordIcon, label: "PIN-protected cash-outs" },
  { icon: Invoice01Icon, label: "Full transaction history" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <p className="text-eyebrow inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Introducing Bima
          </p>

          <h1 className="mt-6 text-4xl font-semibold text-balance text-foreground sm:text-5xl lg:text-6xl">
            The premium way to
            <span className="block text-primary">manage your earnings</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground lg:mx-0">
            Bima brings your products, team rewards and M-Pesa wallet together in one fast, secure account.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
              <Link href="/register">
                Create your account
                <ArrowRight02Icon className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 bg-card px-7 text-base">
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 lg:justify-start">
            {assurances.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center justify-center gap-2">
                <Icon className="size-4 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <BrandBanner
          size="lg"
          eyebrow="One account"
          title="Built with precision. Designed for you."
          subtitle="Products, team and wallet — all in one place."
        />
      </div>
    </section>
  )
}
