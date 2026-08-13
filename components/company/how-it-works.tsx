"use client"

import { UserAdd01Icon, CheckmarkBadge01Icon, MoneyReceiveSquareIcon, ArrowUp01Icon } from "hugeicons-react"

const steps = [
  {
    icon: UserAdd01Icon,
    step: "01",
    title: "Register",
    description: "Create your account and complete your profile",
  },
  {
    icon: CheckmarkBadge01Icon,
    step: "02",
    title: "Get Verified",
    description: "Submit your documents for quick verification",
  },
  {
    icon: ArrowUp01Icon,
    step: "03",
    title: "Start Promoting",
    description: "Promote products and earn commissions",
  },
  {
    icon: MoneyReceiveSquareIcon,
    step: "04",
    title: "Get Paid",
    description: "Withdraw your earnings weekly",
  },
]

export function HowItWorks() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-4">How It Works</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 mb-4 last:mb-0">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <step.icon size={24} className="text-primary-foreground" />
              </div>
              {index < steps.length - 1 && <div className="w-0.5 h-full bg-primary/20 my-2" />}
            </div>
            <div className="flex-1 pb-4">
              <span className="text-xs font-medium text-primary">Step {step.step}</span>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
