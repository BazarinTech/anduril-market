'use client'

import {
  Wallet01Icon,
  Download01Icon,
  TaskDone01Icon,
  InformationCircleIcon,
  MarketingIcon,
  GiftIcon,
  WhatsappIcon,
  TelegramIcon,
} from "hugeicons-react"
import { useRouter } from "next/navigation"

const actions = [
  { icon: Wallet01Icon, label: "Recharge", link: "/recharge" },
  { icon: Download01Icon, label: "Withdraw", link: "/cashout" },
  { icon: GiftIcon, label: "Bonus", link: "/bonus" },
  { icon: MarketingIcon, label: "Influencer", link: "/incentive" },
  { icon: TaskDone01Icon, label: "Records", link: "/records" },
  { icon: InformationCircleIcon, label: "About", link: "/company" },
  { icon: WhatsappIcon, label: "WhatsApp", link: process.env.NEXT_PUBLIC_WHATSAPP_GROUP ?? "" },
  { icon: TelegramIcon, label: "Telegram", link: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL ?? "" }
]

export function QuickActions() {
  const router = useRouter()
  return (
    <section aria-label="Quick actions" className="rounded-xl bg-card p-4 shadow-premium ring-1 ring-border/70">
      <div className="grid grid-cols-4 gap-x-2 gap-y-5">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              className="group flex flex-col items-center gap-2"
              onClick={() => router.push(action.link)}
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-active:scale-95">
                <Icon className="size-6" strokeWidth={1.6} />
              </span>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
