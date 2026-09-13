'use client'

import LogoutAlert from '@/components/alerts/logout-alert'
import WalletCard from '@/components/mine/wallet-card'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { BimaMark } from '@/components/shared/brand-logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrency } from '@/lib/hooks/use-currency'
import { useMainStore } from '@/lib/stores/use-main-store'
import { Logout } from '@hugeicons/core-free-icons'
import {
  Wallet01Icon,
  Download01Icon,
  InformationCircleIcon,
  Agreement02Icon,
  Ticket02Icon,
  PackageIcon,
  File01Icon,
  InformationSquareIcon,
  LockPasswordIcon,
  CustomerServiceIcon,
  Download02Icon,
  ArrowRight01Icon,
  CoinsSwapIcon,
  Gif01Icon,
  Logout01Icon,
  WhatsappIcon,
  TelegramIcon,
} from "hugeicons-react"
import Link from 'next/dist/client/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const menuItems = [
  { icon: InformationCircleIcon, label: "Withdraw Account", href: "/cashout-wallet" },
  { icon: TelegramIcon, label: "Telegram Channel", href: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL ?? "" },
  { icon: Ticket02Icon, label: "My Coupon", href: "/bonus" },
  { icon: WhatsappIcon, label: "Whatsapp group", href: process.env.NEXT_PUBLIC_WHATSAPP_GROUP ?? "" },
  { icon: File01Icon, label: "Records", href: "/records" },
  { icon: InformationSquareIcon, label: "About US", href: "/company" },
  { icon: LockPasswordIcon, label: "Reset Password", href: "/reset-password" },
  { icon: CustomerServiceIcon, label: "Customer Service", href: process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT ?? "" },
  { icon: Download02Icon, label: "App Download", href: "https://apk.e-droid.net/apk/app3980533-tdv41u.apk?v=2" },
  { icon: Logout01Icon, label: "Logout", href: "/login" },
]

function Page() {
  const router = useRouter()
  const [islogoutAlertOpen, setIslogoutAlertOpen] = useState(false)
  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)
  const isMainFetching = useMainStore((state) => state.isMainFetching)

  useEffect(() => {
    loginState()
  }, [loginState])

  const handleLogoutClick = () => {
    setIslogoutAlertOpen(true)
  }

  const loading = isMainFetching && !mainDetails

  return (
    <div>
      <Topbar title="My Account" />
      {/* Header with Profile */}
      <div className="bg-hero relative overflow-hidden px-4 pt-8 pb-14">
        <div className="flex flex-col items-center">
          <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
            <BimaMark size={48} title="Bima" />
          </div>
          {loading ? (
            <>
              <Skeleton className="h-6 w-20 rounded-full mb-2 bg-white/15" />
              <Skeleton className="h-4 w-28 mb-1 bg-white/15" />
              <Skeleton className="h-4 w-24 bg-white/15" />
            </>
          ) : (
            <>
              <span className="text-eyebrow mb-2 rounded-full bg-white/10 px-3 py-1 text-brand-bright ring-1 ring-white/10">
                {mainDetails?.wallet?.level}
              </span>
              <p className="font-semibold tabular-nums">ID {mainDetails?.user?.ID}</p>
              <p className="text-sm text-ink-foreground/70 tabular-nums">{mainDetails?.user?.phone}</p>
            </>
          )}
        </div>
        <div className="brand-hairline absolute inset-x-0 bottom-0" />
      </div>

      <div className="relative mx-auto max-w-md px-4 -mt-7">
        {/* Income & Team Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 shadow-premium ring-border/70">
            <div className="text-center mb-3">
              {loading ? (
                <><Skeleton className="h-6 w-24 mx-auto mb-1" /><Skeleton className="h-3 w-32 mx-auto" /></>
              ) : (
                <><p className="text-lg font-semibold text-foreground tabular-nums">{useCurrency(mainDetails?.wallet?.today_income ?? 0)}</p>
                <p className="text-xs text-muted-foreground">Today&apos;s Product Income</p></>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              onClick={() => router.push('/products')}
            >
              <CoinsSwapIcon size={16} className="mr-2" />
              Make more
            </Button>
          </Card>

          <Card className="p-4 shadow-premium ring-border/70">
            <div className="text-center mb-3">
              {loading ? (
                <><Skeleton className="h-6 w-16 mx-auto mb-1" /><Skeleton className="h-3 w-24 mx-auto" /></>
              ) : (
                <><p className="text-lg font-semibold text-foreground tabular-nums">{mainDetails?.referral?.active_downlines}</p>
                <p className="text-xs text-muted-foreground">Active Team</p></>
              )}
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push('/team')}>
              <Gif01Icon size={16} className="mr-2" />
              Invite more
            </Button>
          </Card>
        </div>

        {/* Wallet Card */}
        <WalletCard className="mb-4" />

        {/* Recharge & Withdraw Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 bg-transparent"
            onClick={() => router.push('/recharge')}
          >
            <Wallet01Icon size={20} className="mr-2" />
            Recharge
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 py-6" onClick={() => router.push('/cashout')}>
            <Download01Icon size={20} className="mr-2" />
            Withdraw
          </Button>
        </div>

          {/* Menu Items */}
          <div className="mb-24 divide-y divide-border overflow-hidden rounded-xl bg-card ring-1 ring-border/70">
            {menuItems.map((item, index) => {
              const isLogout = item.label.toLowerCase() === "logout" // or item.href === "/login"

              const RowContent = (
                <>
                  <div className="flex items-center gap-3">
                    <span className={`flex size-9 items-center justify-center rounded-lg ${isLogout ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"}`}>
                      <item.icon size={18} />
                    </span>
                    <span className={`text-sm font-medium ${isLogout ? "text-destructive" : "text-foreground"}`}>{item.label}</span>
                  </div>
                  <ArrowRight01Icon size={18} className="text-muted-foreground" />
                </>
              )

              if (isLogout) {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/60 transition-colors text-left"
                  >
                    {RowContent}
                  </button>
                )
              }

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/60 transition-colors"
                >
                  {RowContent}
                </Link>
              )
            })}
          </div>
       </div>
      <BottomNav />
      <LogoutAlert isOpen={islogoutAlertOpen} onClose={() => setIslogoutAlertOpen(false)} />
    </div>
  )
}

export default Page