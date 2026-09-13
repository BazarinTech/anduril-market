import { Wallet01Icon, UserMultiple02Icon, ShoppingBag01Icon, Shield01Icon } from "hugeicons-react"

export function FeaturesSection() {
  const features = [
    {
      icon: ShoppingBag01Icon,
      title: "Products",
      description: "Choose a product, see its price, cycle and daily income up front, and track what each one has earned.",
    },
    {
      icon: UserMultiple02Icon,
      title: "Team rewards",
      description: "Share your invite link and follow your team across three levels, with bonus and incentive tiers.",
    },
    {
      icon: Wallet01Icon,
      title: "M-Pesa wallet",
      description: "Top up with an STK push and cash out to your registered M-Pesa number, with every movement recorded.",
    },
    {
      icon: Shield01Icon,
      title: "Built-in security",
      description: "Withdrawals require your PIN, and a forgotten PIN is reset by SMS to the number on your account.",
    },
  ]

  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-eyebrow text-primary">Features</p>
        <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Everything in one account</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A single place for your products, your team and your money.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-xl bg-card p-6 ring-1 ring-border/70 transition-all hover:-translate-y-0.5 hover:shadow-premium"
          >
            <div className="mb-5 inline-flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
