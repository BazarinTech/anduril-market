'use client'

import LogoutAlert from '@/components/alerts/logout-alert'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { CloudFarmerMark } from '@/components/shared/brand-logo'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrency } from '@/lib/hooks/use-currency'
import { useMainStore } from '@/lib/stores/use-main-store'
import { useTourStore } from '@/lib/stores/use-tour-store'
import {
  Wallet01Icon,
  Download01Icon,
  InformationCircleIcon,
  Ticket02Icon,
  File01Icon,
  InformationSquareIcon,
  LockPasswordIcon,
  CustomerServiceIcon,
  Download02Icon,
  ArrowRight01Icon,
  WhatsappIcon,
  TelegramIcon,
  Compass01Icon,
} from "hugeicons-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type MenuItem = {
  icon: typeof Wallet01Icon
  label: string
  href?: string
  action?: "tour"
  tour?: string
}

const menuGroups: { label: string; tour?: string; items: MenuItem[] }[] = [
  {
    label: "Account",
    tour: "profile-menu",
    items: [
      { icon: InformationCircleIcon, label: "Withdraw Account", href: "/cashout-wallet" },
      { icon: File01Icon, label: "Records", href: "/records" },
      { icon: Ticket02Icon, label: "My Coupon", href: "/bonus" },
      { icon: LockPasswordIcon, label: "Reset Password", href: "/reset-password" },
      // Kimani on demand: the tour is offered once, so this is how it is found again.
      { icon: Compass01Icon, label: "Replay guide", action: "tour" as const },
    ],
  },
  {
    label: "Community",
    items: [
      { icon: TelegramIcon, label: "Telegram Channel", href: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL ?? "" },
      { icon: WhatsappIcon, label: "Whatsapp group", href: process.env.NEXT_PUBLIC_WHATSAPP_GROUP ?? "", tour: "whatsapp" },
      { icon: CustomerServiceIcon, label: "Customer Service", href: process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT ?? "" },
      { icon: InformationSquareIcon, label: "About US", href: "/company" },
      { icon: Download02Icon, label: "App Download", href: "https://apk.e-droid.net/apk/app3980533-tdv41u.apk?v=2" },
    ],
  },
]

/**
 * The account page, stripped back.
 *
 * One field surface at the top carrying who you are and what you hold, then
 * plain lists. The cards, icon tiles and boxed stat grid that used to sit
 * between them were five separate surfaces saying what two now say.
 */
function Page() {
  const router = useRouter()
  const [islogoutAlertOpen, setIslogoutAlertOpen] = useState(false)
  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)

  useEffect(() => {
    loginState()
  }, [loginState])

  // Kimani starts from the top when replayed from here.
  const startTour = () => useTourStore.getState().start(0)

  const loading = !mainDetails
  const wallet = mainDetails?.wallet

  // Formatted before the JSX: useCurrency is a plain function, but calling it
  // inside a ternary trips rules-of-hooks on its "use" prefix.
  const balance = useCurrency(wallet?.balance ?? 0)
  const today = useCurrency(wallet?.today_income ?? 0)
  const invite = useCurrency(wallet?.invite_income ?? 0)
  const activeTeam = String(mainDetails?.referral?.active_downlines ?? 0)

  return (
    <div>
      <Topbar title="My Account" />

      <header className="bg-hero relative overflow-hidden px-5 pt-6 pb-8">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-leaf/25">
              <CloudFarmerMark size={34} title="Cloud Farmer" />
            </div>
            <div className="min-w-0 flex-1">
              {loading ? (
                <>
                  <Skeleton className="mb-2 h-5 w-24 rounded-full bg-white/15" />
                  <Skeleton className="h-4 w-32 bg-white/15" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-ink-foreground">{mainDetails?.user?.username ?? "Farmer"}</p>
                    <span className="text-eyebrow shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-brand-bright ring-1 ring-leaf/25">
                      {wallet?.level}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-ink-foreground/55 tabular-nums">
                    ID {mainDetails?.user?.ID} · {mainDetails?.user?.phone}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-eyebrow text-brand-bright">Available balance</p>
            {loading ? (
              <Skeleton className="mt-2 h-10 w-48 bg-white/15" />
            ) : (
              <p className="mt-1 text-4xl font-semibold text-ink-foreground tabular-nums">{balance}</p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/recharge')}
                className="flex h-11 items-center justify-center gap-2 rounded-4xl text-sm font-semibold text-ink-foreground ring-1 ring-white/20 transition-colors hover:bg-white/10"
              >
                <Wallet01Icon size={18} />
                Recharge
              </button>
              <button
                onClick={() => router.push('/cashout')}
                className="flex h-11 items-center justify-center gap-2 rounded-4xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep"
              >
                <Download01Icon size={18} />
                Withdraw
              </button>
            </div>

            {/* The day's figures as one line, not a grid of boxes. */}
            {!loading && (
              <p className="mt-5 truncate text-xs text-ink-foreground/55 tabular-nums">
                Today {today} · Active team {activeTeam} · Invite income {invite}
              </p>
            )}
          </div>
        </div>
        <div className="brand-hairline absolute inset-x-0 bottom-0" />
      </header>

      <div className="mx-auto max-w-md px-5 pt-7">
        {menuGroups.map((group) => (
          <section key={group.label} className="mb-7">
            <h2 className="text-eyebrow mb-1 text-muted-foreground">{group.label}</h2>
            <div data-tour={group.tour} className="divide-y divide-border/70">
              {group.items.map((item) => {
                const row = (
                  <>
                    <item.icon size={19} className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                    <ArrowRight01Icon size={17} className="shrink-0 text-muted-foreground/60" />
                  </>
                )
                const rowClass = "group flex w-full items-center gap-3.5 py-3.5 text-left"

                if (item.action === "tour") {
                  return (
                    <button key={item.label} type="button" data-tour={item.tour} className={rowClass} onClick={startTour}>
                      {row}
                    </button>
                  )
                }

                return (
                  <Link key={item.label} href={item.href ?? "#"} data-tour={item.tour} className={rowClass}>
                    {row}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}

        <button
          type="button"
          onClick={() => setIslogoutAlertOpen(true)}
          className="w-full py-3 text-center text-sm font-semibold text-destructive transition-opacity hover:opacity-70"
        >
          Log out
        </button>
      </div>

      <BottomNav />
      <LogoutAlert isOpen={islogoutAlertOpen} onClose={() => setIslogoutAlertOpen(false)} />
    </div>
  )
}

export default Page
