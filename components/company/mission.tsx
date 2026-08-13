"use client"

import { Target02Icon, EyeIcon, StarIcon } from "hugeicons-react"

const items = [
  {
    icon: Target02Icon,
    title: "Our Mission",
    description:
      "To connect skilled workers with meaningful opportunities while helping businesses scale through efficient order promotion and workforce management.",
  },
  {
    icon: EyeIcon,
    title: "Our Vision",
    description:
      "To become the leading platform bridging the gap between workers seeking flexible employment and companies needing reliable promotion and rental services.",
  },
  {
    icon: StarIcon,
    title: "Our Values",
    description:
      "Integrity, reliability, and growth. We believe in fair compensation, transparent processes, and creating value for both workers and partners.",
  },
]

export function MissionSection() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Who We Are</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <item.icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
