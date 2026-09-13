import { ShoppingBag01Icon, Wallet01Icon, UserMultiple02Icon, Award01Icon } from "hugeicons-react"

// What the platform actually offers. The previous list described worker
// recruitment and a "rental business" -- neither exists anywhere in the app.
const services = [
  {
    icon: ShoppingBag01Icon,
    title: "Products",
    description: "Choose products with a clear price, cycle and daily income.",
  },
  {
    icon: Wallet01Icon,
    title: "M-Pesa Wallet",
    description: "Top up by STK push and cash out to your M-Pesa number.",
  },
  {
    icon: UserMultiple02Icon,
    title: "Team Rewards",
    description: "Invite members and follow your team across three levels.",
  },
  {
    icon: Award01Icon,
    title: "Incentives",
    description: "Reach referral milestones to apply for incentive tiers.",
  },
]

export function ServicesSection() {
  return (
    <div className="bg-muted/40 px-4 py-6">
      <h2 className="mb-4 text-base font-semibold text-foreground">Our Services</h2>
      <div className="grid grid-cols-2 gap-3">
        {services.map((service) => (
          <div key={service.title} className="rounded-xl bg-card p-4 ring-1 ring-border/70">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-ink text-ink-foreground">
              <service.icon size={20} />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{service.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
