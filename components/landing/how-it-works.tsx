import { UserAdd01Icon, SmartPhone01Icon, ShoppingBag01Icon, MoneyReceiveSquareIcon } from "hugeicons-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserAdd01Icon,
      step: "01",
      title: "Create your account",
      description: "Sign up with your phone number, name and email.",
    },
    {
      icon: SmartPhone01Icon,
      step: "02",
      title: "Top up with M-Pesa",
      description: "Enter an amount and confirm the STK push on your phone.",
    },
    {
      icon: ShoppingBag01Icon,
      step: "03",
      title: "Choose a product",
      description: "Compare price, cycle and daily income, then add a product.",
    },
    {
      icon: MoneyReceiveSquareIcon,
      step: "04",
      title: "Cash out",
      description: "Withdraw to your registered M-Pesa number with your PIN.",
    },
  ]

  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-border bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-primary">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Four steps to get going</h2>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <li key={item.step} className="relative rounded-xl bg-background p-6 ring-1 ring-border/70">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                  <item.icon className="size-5" />
                </span>
                <span className="font-mono text-sm font-semibold text-muted-foreground/70">{item.step}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
