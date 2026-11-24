import { Album01Icon, UserMultiple02Icon, Wallet01Icon, Shield01Icon } from "hugeicons-react"
import { StageScene } from "@/components/shared/stage-scene"

const smallFeatures = [
  { icon: UserMultiple02Icon, title: "Your crew", description: "Share your invite code and earn across three levels." },
  { icon: Wallet01Icon, title: "M-Pesa wallet", description: "STK push in, straight to M-Pesa out." },
  { icon: Shield01Icon, title: "Built-in security", description: "Every withdrawal guarded by your PIN, reset by SMS." },
]

/**
 * Features as a bento grid: the music library takes the large dark tile,
 * since it is the product; the supporting features sit beside it.
 */
export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-border bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-primary">Features</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Everything in one place</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
          <div className="bg-hero relative isolate flex min-h-72 flex-col justify-end overflow-hidden rounded-3xl p-7 shadow-premium md:col-span-2 lg:row-span-3">
            <StageScene className="absolute inset-0 -z-10" />
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-brand-bright ring-1 ring-white/15">
              <Album01Icon className="size-6" />
            </span>
            <h3 className="text-2xl font-semibold text-ink-foreground">The Music Library</h3>
            <p className="mt-2 max-w-sm text-ink-foreground/70">
              Every track shows its rental price, its term and what it earns daily, up front. Rent one and it
              earns once a day for its whole term.
            </p>
            <div className="brand-hairline absolute inset-x-0 bottom-0" />
          </div>

          {smallFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl bg-background p-6 ring-1 ring-border/70 transition-all hover:-translate-y-0.5 hover:shadow-premium"
            >
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
