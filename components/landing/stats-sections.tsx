export function StatsSection() {
  const stats = [
    { value: "5K+", label: "Active Workers", description: "earning daily" },
    { value: "KSH 2M+", label: "Paid Out", description: "this month" },
    { value: "50+", label: "Cities", description: "covered" },
    { value: "24hrs", label: "Fast Payouts", description: "guaranteed" },
  ]

  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
