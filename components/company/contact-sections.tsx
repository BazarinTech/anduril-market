"use client"

import { Call02Icon, Mail01Icon, Location01Icon, Clock01Icon } from "hugeicons-react"

const contactInfo = [
  {
    icon: Call02Icon,
    label: "Phone",
    value: "+254 700 123 456",
  },
  {
    icon: Mail01Icon,
    label: "Email",
    value: "support@sandersonfarms.com",
  },
  {
    icon: Location01Icon,
    label: "Address",
    value: "Nairobi, Kenya",
  },
  {
    icon: Clock01Icon,
    label: "Working Hours",
    value: "Mon - Fri: 8AM - 6PM",
  },
]

export function ContactSection() {
  return (
    <div className="px-4 py-6 bg-muted/30">
      <h2 className="text-lg font-bold text-foreground mb-4">Contact Us</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {contactInfo.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-4 border-b border-border last:border-b-0">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <item.icon size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-medium text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6">
        &copy; 2025 Sanderson Farms. All rights reserved.
      </p>
    </div>
  )
}
