import { SmartPhone01Icon, UserGroupIcon, LockPasswordIcon, Invoice01Icon } from "hugeicons-react"

/**
 * Plain facts about the product, in one strip under the player card.
 *
 * Each is something the app demonstrably does. An earlier band showed user
 * counts and payout totals that came from nowhere; nothing here is a figure
 * that would need a source.
 */
const facts = [
  { icon: SmartPhone01Icon, value: "M-Pesa", label: "Top up and withdraw" },
  { icon: UserGroupIcon, value: "3 levels", label: "Crew commission" },
  { icon: LockPasswordIcon, value: "PIN", label: "Guards every cash-out" },
  { icon: Invoice01Icon, value: "KES", label: "Full history, no conversion" },
]

export function StatsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-14 pb-6">
      <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-border">
        {facts.map(({ icon: Icon, value, label }) => (
          <li key={label} className="flex flex-col items-center gap-2 px-4 text-center">
            <Icon className="size-5 text-primary" />
            <p className="text-xl font-semibold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
