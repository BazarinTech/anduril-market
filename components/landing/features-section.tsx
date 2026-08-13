import { Wallet01Icon, UserMultiple02Icon, TimeScheduleIcon, Shield01Icon } from "hugeicons-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Wallet01Icon,
      title: "Earn Your Way",
      description: "Set your own schedule and earn money promoting orders and completing tasks on your terms.",
    },
    {
      icon: UserMultiple02Icon,
      title: "Build Your Team",
      description: "Invite friends to join and earn bonuses when they become active. Grow together.",
    },
    {
      icon: TimeScheduleIcon,
      title: "Flexible Hours",
      description: "Work when you want, where you want. No fixed schedules, no pressure.",
    },
    {
      icon: Shield01Icon,
      title: "Secure Payments",
      description: "Fast M-Pesa withdrawals within 24 hours. Your earnings, always accessible.",
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why workers choose us</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to start earning, all in one platform.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
