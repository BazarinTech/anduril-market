"use client"

import { UserSearch01Icon, PhoneOff01Icon, Briefcase01Icon, HandGripIcon } from "hugeicons-react"

const services = [
  {
    icon: UserSearch01Icon,
    title: "Worker Recruitment",
    description:
      "We source, vet, and connect skilled workers with businesses needing reliable staff for various roles.",
  },
  {
    icon: PhoneOff01Icon,
    title: "Order Promotion",
    description: "Promote farm products for Sanderson Farms through our network of dedicated promoters.",
  },
  {
    icon: Briefcase01Icon,
    title: "Flexible Employment",
    description: "Offering workers flexible earning opportunities with competitive pay and weekly incentives.",
  },
  {
    icon: HandGripIcon,
    title: "Business Partnership",
    description: "Partner with us to access our workforce network and boost your rental business growth.",
  },
]

export function ServicesSection() {
  return (
    <div className="px-4 py-6 bg-muted/30">
      <h2 className="text-lg font-bold text-foreground mb-4">Our Services</h2>
      <div className="grid grid-cols-2 gap-3">
        {services.map((service, index) => (
          <div key={index} className="bg-card rounded-xl p-4 border border-border">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3">
              <service.icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground text-sm">{service.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
