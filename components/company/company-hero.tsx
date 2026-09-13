import { BimaMark } from "@/components/shared/brand-logo"

// Replaces "5K+ Workers / 200+ Partners / 50+ Cities", which had no source.
const pillars = [
  { value: "M-Pesa", label: "Wallet" },
  { value: "3", label: "Team levels" },
  { value: "PIN", label: "Secured" },
]

export function CompanyHero() {
  return (
    <div className="bg-hero relative overflow-hidden px-4 pt-10 pb-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <BimaMark size={52} title="Bima" />
        </div>
        <div>
          <p className="text-eyebrow text-brand-bright">About</p>
          <h1 className="mt-1 text-2xl font-semibold uppercase tracking-[0.24em] text-ink-foreground">Bima</h1>
          <p className="mt-2 text-sm text-ink-foreground/70">Products, team rewards and an M-Pesa wallet in one account.</p>
        </div>
        <dl className="mt-2 flex gap-6">
          {pillars.map((pillar, index) => (
            <div key={pillar.label} className="flex items-center gap-6">
              {index > 0 && <div className="h-8 w-px bg-white/15" />}
              <div className="text-center">
                <dd className="text-xl font-semibold text-ink-foreground">{pillar.value}</dd>
                <dt className="text-[11px] text-ink-foreground/60">{pillar.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </div>
  )
}
