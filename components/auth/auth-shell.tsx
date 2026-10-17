import Link from "next/link"
import { CloudFarmerLogo } from "@/components/shared/brand-logo"
import { FarmScene } from "@/components/shared/farm-scene"

type Props = {
  title: string
  subtitle: string
  children: React.ReactNode
  /** The line under the form -- "Already have an account?" and the like. */
  footer?: React.ReactNode
  /** Where the logo leads. Sign-in and sign-up point at each other's start. */
  home?: string
}

// The whole proposition in three words each. Shown beside the form on a wide
// screen, folded into a single line on a phone.
const steps = [
  { n: "01", label: "Take a plot" },
  { n: "02", label: "Collect daily" },
  { n: "03", label: "Grow your circle" },
]

/**
 * The frame every sign-in screen sits in.
 *
 * A field panel carries the brand and the promise; the form arrives on a pale
 * sheet that lifts over it on a phone and sits beside it on a desktop. The old
 * screens were a dark banner stacked on a plain white page, which gave the
 * form no ground of its own and wasted every pixel of a wide screen.
 */
export function AuthShell({ title, subtitle, children, footer, home = "/login" }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-ink lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="bg-hero relative overflow-hidden px-6 pt-12 pb-14 lg:flex lg:min-h-dvh lg:flex-col lg:justify-between lg:px-12 lg:py-16">
        <FarmScene className="absolute inset-x-0 bottom-0 h-48 opacity-60 lg:h-72" />

        <div className="relative">
          <Link href={home} aria-label="Cloud Farmer">
            <CloudFarmerLogo size="sm" inverse />
          </Link>

          <h1 className="mt-10 text-3xl leading-tight font-semibold text-ink-foreground lg:mt-16 lg:text-5xl">
            {title}
          </h1>
          <p className="mt-2 max-w-sm text-sm text-ink-foreground/65 lg:text-base">{subtitle}</p>
        </div>

        <ol className="relative mt-8 flex gap-5 lg:mt-0 lg:flex-col lg:gap-5">
          {steps.map((step) => (
            <li key={step.n} className="flex min-w-0 items-center gap-2.5">
              <span className="text-eyebrow shrink-0 text-brand-bright tabular-nums">{step.n}</span>
              <span className="truncate text-xs text-ink-foreground/70 lg:text-sm">{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="brand-hairline absolute inset-x-0 bottom-0 lg:hidden" />
      </aside>

      <main className="relative z-10 -mt-7 flex-1 rounded-t-[2rem] bg-background px-6 pt-9 pb-14 shadow-premium lg:mt-0 lg:flex lg:min-h-dvh lg:items-center lg:rounded-none lg:px-12 lg:shadow-none">
        <div className="mx-auto w-full max-w-sm">
          {children}
          {footer && <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </main>
    </div>
  )
}
