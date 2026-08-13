'use client'

import LogoutAlert from '@/components/alerts/logout-alert'
import WalletCard from '@/components/mine/wallet-card'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
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
      <Topbar title="Sanderson Profile" />
      {/* Header with Profile */}
      <div className="bg-primary text-primary-foreground pt-4 pb-8 px-4">
        <h1 className="text-center font-semibold mb-6">Mine</h1>

        {/* Profile Avatar and Info */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2 border-2 border-primary-foreground/30 overflow-hidden">
            <img src="/favicon.ico" alt="Avatar" className="w-12 h-12 object-contain" />
          </div>
          {loading ? (
            <>
              <Skeleton className="h-6 w-20 rounded-full mb-2 bg-primary-foreground/30" />
              <Skeleton className="h-4 w-28 mb-1 bg-primary-foreground/30" />
              <Skeleton className="h-4 w-24 bg-primary-foreground/30" />
            </>
          ) : (
            <>
              <div className="bg-primary-foreground/20 px-3 py-0.5 rounded-full text-sm flex items-center gap-1 mb-2">
                <span className="text-xs">▼</span>
                <span>{mainDetails?.wallet.level}</span>
              </div>
              <p className="font-semibold">ID : {mainDetails?.user.ID}</p>
              <p className="text-primary-foreground/80 text-sm">{mainDetails?.user.phone}</p>
            </>
          )}
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Income & Coffee Beans Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 bg-card">
            <div className="text-center mb-3">
              {loading ? (
                <><Skeleton className="h-6 w-24 mx-auto mb-1" /><Skeleton className="h-3 w-32 mx-auto" /></>
              ) : (
                <><p className="text-lg font-bold text-foreground">{useCurrency(mainDetails?.wallet.today_income ?? 0)}</p>
                <p className="text-xs text-muted-foreground">Today&apos;s Product Income</p></>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              onClick={() => router.push('/products')}
            >
              <CoinsSwapIcon size={16} className="mr-2" />
              Make more
            </Button>
          </Card>

          <Card className="p-4 bg-card">
            <div className="text-center mb-3">
              {loading ? (
                <><Skeleton className="h-6 w-16 mx-auto mb-1" /><Skeleton className="h-3 w-24 mx-auto" /></>
              ) : (
                <><p className="text-lg font-bold text-foreground">{mainDetails?.referral.active_downlines}</p>
                <p className="text-xs text-muted-foreground">Active Team</p></>
              )}
            </div>
            <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push('/team')}>
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
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 bg-transparent"
            onClick={() => router.push('/recharge')}
          >
            <Wallet01Icon size={20} className="mr-2" />
            Recharge
          </Button>
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6" onClick={() => router.push('/cashout')}>
            <Download01Icon size={20} className="mr-2" />
            Withdraw
          </Button>
        </div>

          {/* Menu Items */}
          <div className="space-y-1 mb-20">
            {menuItems.map((item, index) => {
              const isLogout = item.label.toLowerCase() === "logout" // or item.href === "/login"

              const RowContent = (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon size={22} className="text-primary" />
                    <span className="text-foreground">{item.label}</span>
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
                    className="w-full flex items-center justify-between py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors text-left"
                  >
                    {RowContent}
                  </button>
                )
              }

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center justify-between py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors"
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