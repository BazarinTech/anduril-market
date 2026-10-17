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

/**
 * The tools, laid out bare.
 *
 * The card around this grid was competing with the picture above it for the
 * same attention; without it the icons sit on the page itself and the home
 * screen reads as one surface instead of a stack of boxes.
 */
export function QuickActions() {
  const router = useRouter()
  return (
    <section aria-label="Quick actions">
      <div className="grid grid-cols-4 gap-x-2 gap-y-5">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              className="group flex flex-col items-center gap-2"
              onClick={() => router.push(action.link)}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-active:scale-95">
                <Icon className="size-[1.375rem]" strokeWidth={1.6} />
              </span>
              <span className="text-[0.6875rem] font-medium text-muted-foreground">{action.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
