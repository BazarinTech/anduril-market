'use client'

import LogoutAlert from '@/components/alerts/logout-alert'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { SpatakasMark } from '@/components/shared/brand-logo'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrency } from '@/lib/hooks/use-currency'
import { useMainStore } from '@/lib/stores/use-main-store'
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
  Logout01Icon,
  WhatsappIcon,
  TelegramIcon,
  UserGroupIcon,
  Coins01Icon,
} from "hugeicons-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// Grouped rather than one ten-row list: the money settings and the community
// links were interleaved, so neither was scannable.
const menuGroups = [
  {
    label: "Account",
    items: [
      { icon: InformationCircleIcon, label: "Withdraw Account", href: "/cashout-wallet" },
      { icon: File01Icon, label: "Records", href: "/records" },
      { icon: Ticket02Icon, label: "My Coupon", href: "/bonus" },
      { icon: LockPasswordIcon, label: "Reset Password", href: "/reset-password" },
    ],
  },
  {
    label: "Community",
    items: [
      { icon: TelegramIcon, label: "Telegram Channel", href: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL ?? "" },
      { icon: WhatsappIcon, label: "Whatsapp group", href: process.env.NEXT_PUBLIC_WHATSAPP_GROUP ?? "" },
      { icon: CustomerServiceIcon, label: "Customer Service", href: process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT ?? "" },
      { icon: InformationSquareIcon, label: "About US", href: "/company" },
      { icon: Download02Icon, label: "App Download", href: "https://apk.e-droid.net/apk/app3980533-tdv41u.apk?v=2" },
    ],
  },
]

function Page() {
  const router = useRouter()
  const [islogoutAlertOpen, setIslogoutAlertOpen] = useState(false)
  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)

  useEffect(() => {
    loginState()
  }, [loginState])

  const loading = !mainDetails
  const wallet = mainDetails?.wallet

  // Formatted before the JSX: useCurrency is a plain function, but calling it
  // inside a ternary trips rules-of-hooks on its "use" prefix.
  const balance = useCurrency(wallet?.balance ?? 0)

  const stats = [
    { icon: Coins01Icon, label: "Today", value: useCurrency(wallet?.today_income ?? 0) },
    { icon: UserGroupIcon, label: "Active team", value: String(mainDetails?.referral?.active_downlines ?? 0) },
    { icon: Wallet01Icon, label: "Invite income", value: useCurrency(wallet?.invite_income ?? 0) },
  ]

  return (
    <div>
      <Topbar title="My Account" />

      {/* Fighter card: identity on one line, balance and actions in the same
          surface. Previously the avatar block, the balance card and the two
          action buttons were three stacked sections saying one thing. */}
      <header className="bg-hero relative overflow-hidden px-4 pt-6 pb-16">
        <div className="mx-auto flex max-w-md items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-gold/25">
            <SpatakasMark size={40} title="Spatakas" />
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
                  <p className="truncate font-semibold text-ink-foreground">{mainDetails?.user?.username ?? "Champion"}</p>
                  <span className="text-eyebrow shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-brand-bright ring-1 ring-gold/25">
                    {wallet?.level}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-ink-foreground/60 tabular-nums">
                  ID {mainDetails?.user?.ID} · {mainDetails?.user?.phone}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="brand-hairline absolute inset-x-0 bottom-0" />
      </header>

      <div className="relative mx-auto max-w-md px-4 pb-24 -mt-10">
        {/* Purse: balance and the two money actions together */}
        <section className="rounded-2xl bg-card p-5 shadow-premium ring-1 ring-border/70">
          <p className="text-eyebrow text-muted-foreground">Available balance</p>
          {loading ? (
            <Skeleton className="mt-1 h-9 w-44" />
          ) : (
            <p className="mt-1 text-3xl font-semibold text-foreground tabular-nums">{balance}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/recharge')}
              className="flex h-11 items-center justify-center gap-2 rounded-4xl border border-primary/40 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
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

          <div className="brand-hairline my-4" />

          <dl className="grid grid-cols-3 gap-2">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon size={16} className="mx-auto mb-1 text-gold" />
                {loading ? (
                  <Skeleton className="mx-auto h-4 w-14" />
                ) : (
                  <dd className="truncate text-sm font-semibold text-foreground tabular-nums">{value}</dd>
                )}
                <dt className="text-[11px] text-muted-foreground">{label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Grouped links */}
        {menuGroups.map((group) => (
          <section key={group.label} className="mt-5">
            <h2 className="text-eyebrow mb-2 px-1 text-muted-foreground">{group.label}</h2>
            <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card ring-1 ring-border/70">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/60"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <item.icon size={18} />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </span>
                  <ArrowRight01Icon size={18} className="text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        ))}

        <button
          type="button"
          onClick={() => setIslogoutAlertOpen(true)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-4xl border border-destructive/30 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <Logout01Icon size={18} />
          Log out
        </button>
      </div>

      <BottomNav />
      <LogoutAlert isOpen={islogoutAlertOpen} onClose={() => setIslogoutAlertOpen(false)} />
    </div>
  )
}

export default Page
