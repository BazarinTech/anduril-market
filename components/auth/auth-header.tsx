import { SpatakasMark } from "@/components/shared/brand-logo"

type Props = {
  title: string
  subtitle: string
}

/** The ink header shared by the sign-in and  sign-up screens. */
export function AuthHeader({ title, subtitle }: Props) {
  return (
    <header className="bg-hero relative overflow-hidden rounded-b-4xl px-6 pt-14 pb-10 text-center">
      <div className="mx-auto mb-5 flex size-18 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-gold/25">
        <SpatakasMark size={52} title="Spatakas" />
      </div>
      <p className="text-eyebrow text-brand-bright">Spatakas</p>
      <h1 className="mt-1.5 text-2xl font-semibold text-ink-foreground">{title}</h1>
      <p className="mt-1 text-sm text-ink-foreground/70">{subtitle}</p>
      <div className="brand-hairline absolute inset-x-8 bottom-0" />
    </header>
  )
}
