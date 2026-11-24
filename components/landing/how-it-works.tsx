import { UserAdd01Icon, SmartPhone01Icon, Album01Icon, MoneyReceiveSquareIcon } from "hugeicons-react"
import { StoryVignette } from "@/components/shared/stage-scene"

const steps = [
  { icon: UserAdd01Icon, title: "Create your account", description: "Phone number, name and email. About a minute." },
  { icon: SmartPhone01Icon, title: "Top up with M-Pesa", description: "Confirm the STK push on your phone with your own PIN." },
  { icon: Album01Icon, title: "Rent a track", description: "Compare price, term and daily earnings, then take your pick." },
  { icon: MoneyReceiveSquareIcon, title: "Collect and cash out", description: "Collect each day's earnings, then send them to your M-Pesa." },
]

/**
 * How it works, set as an album's tracklist: a cover on the left, the four
 * steps as numbered tracks on the right. On a phone the cover sits on top.
 */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-hero relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl shadow-premium">
            <StoryVignette variant="discover" className="absolute inset-0" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="text-eyebrow text-brand-bright">The album</p>
              <p className="mt-1 text-xl font-semibold text-ink-foreground">How it works</p>
            </div>
            <div className="brand-hairline absolute inset-x-0 bottom-0" />
          </div>
          <h2 className="mt-8 text-3xl font-semibold text-foreground sm:text-4xl">Four tracks to your first payout</h2>
          <p className="mt-3 text-muted-foreground">Every step happens on your phone.</p>
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {steps.map((step, i) => (
            <li key={step.title} className="group flex items-center gap-5 py-6">
              <span className="w-8 shrink-0 font-mono text-sm font-semibold text-muted-foreground/70 tabular-nums group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="size-5" />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
