'use client'
import { EventsSection } from '@/components/home/events-sections'
import { NotificationTicker } from '@/components/home/notification-ticker'
import { QuickActions } from '@/components/home/quick-actions'
import { WelcomeModal } from '@/components/home/welcome-modal'
import { BrandBanner } from '@/components/shared/brand-banner'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { useMainStore } from '@/lib/stores/use-main-store'
import React, { useEffect } from 'react'


function Page() {
  const loginState = useMainStore((state) => state.loginState)
  // `user?.` as well as `mainDetails?.`: when the API rejects a session it
  // answers with an error body, which the store keeps as mainDetails as-is.
  const username = useMainStore((state) => state.mainDetails?.user?.username)
  useEffect(() => {
    loginState()
  }, [loginState])

  return (
    <div>
      <Topbar title="Spatakas" brand />

      <main className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 pt-4 pb-24">
        <div data-tour="home-banner">
          <BrandBanner
            eyebrow="The arena"
            title={username ? `Salute, ${username}` : "Welcome, champion"}
            subtitle="Products · Team · Wallet"
          />
        </div>

        <div data-tour="quick-actions">
          <QuickActions />
        </div>

        <NotificationTicker />

        <EventsSection />
      </main>

      <WelcomeModal />
      <BottomNav />
    </div>
  )
}

export default Page
