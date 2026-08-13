import { UserAdd01Icon, SmartPhone01Icon, MoneyReceiveSquareIcon, CheckmarkCircle02Icon } from "hugeicons-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserAdd01Icon,
      step: "01",
      title: "Create Account",
      description: "Sign up in minutes with just your phone number. Quick verification, instant access.",
    },
    {
      icon: SmartPhone01Icon,
      step: "02",
      title: "Browse Tasks",
      description: "Explore available tasks and order promotions. Choose what fits your schedule.",
    },
    {
      icon: CheckmarkCircle02Icon,
      step: "03",
      title: "Complete Work",
      description: "Finish tasks, promote orders, and invite friends to boost your earnings.",
    },
    {
      icon: MoneyReceiveSquareIcon,
      step: "04",
      title: "Get Paid",
      description: "Withdraw your earnings instantly to M-Pesa. Fast, secure, hassle-free.",
    },
  ]

  return (
    <section className="bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start earning in 4 simple steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started is easy. No experience required.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-border" />
              )}

              <div className="relative rounded-2xl bg-card p-6 border border-border">
                <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {item.step}
                </span>
                <div className="mt-2 mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
