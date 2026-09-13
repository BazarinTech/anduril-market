import { UserAdd01Icon, SmartPhone01Icon, ShoppingBag01Icon, MoneyReceiveSquareIcon } from "hugeicons-react"

const steps = [
  {
    icon: UserAdd01Icon,
    step: "01",
    title: "Register",
    description: "Create your account with your phone number",
  },
  {
    icon: SmartPhone01Icon,
    step: "02",
    title: "Top Up",
    description: "Add funds by confirming an M-Pesa STK push",
  },
  {
    icon: ShoppingBag01Icon,
    step: "03",
    title: "Choose a Product",
    description: "Pick a product and claim its income as it accrues",
  },
  {
    icon: MoneyReceiveSquareIcon,
    step: "04",
    title: "Withdraw",
    description: "Cash out to your registered M-Pesa number",
  },
]

export function HowItWorks() {
  return (
    <div className="px-4 py-6 pb-10">
      <h2 className="mb-4 text-base font-semibold text-foreground">How It Works</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={step.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon size={20} />
              </div>
              {index < steps.length - 1 && <div className="my-1.5 w-px flex-1 bg-border" />}
            </div>
            <div className="flex-1 pb-5">
              <span className="font-mono text-xs font-semibold text-primary">Step {step.step}</span>
              <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
