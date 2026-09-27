import { Target02Icon, EyeIcon, StarIcon } from "hugeicons-react"

const items = [
  {
    icon: Target02Icon,
    title: "Our Mission",
    description:
      "One clear, dependable place for your products, your team and your money.",
  },
  {
    icon: EyeIcon,
    title: "Our Vision",
    description:
      "A platform worth trusting — fast, precise, and plain to read.",
  },
  {
    icon: StarIcon,
    title: "Our Values",
    description:
      "Clarity and security. Every figure on screen is one you can check.",
  },
]

export function MissionSection() {
  return (
    <div className="px-4 py-6">
      <h2 className="mb-4 text-base font-semibold text-foreground">Who We Are</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl bg-card p-4 ring-1 ring-border/70">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
