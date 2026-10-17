'use client'
import { EventsSection } from '@/components/home/events-sections'
import { FarmDisplay } from '@/components/home/farm-display'
import { NotificationTicker } from '@/components/home/notification-ticker'
import { QuickActions } from '@/components/home/quick-actions'
import { WelcomeModal } from '@/components/home/welcome-modal'
import { BottomNav } from '@/components/shared/bottombar'
import { Reveal } from '@/components/shared/reveal'
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
      <Topbar title="Cloud Farmer" brand />

      {/* The page reads top to bottom as a day on the farm: the herd, the
          tools, word from the yard, then what is coming. Each block arrives
          in turn rather than all at once. */}
      <main className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 pt-4 pb-24">
        <Reveal>
          <FarmDisplay name={username} />
        </Reveal>

        <Reveal delay={0.08}>
          <div data-tour="quick-actions">
            <QuickActions />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <NotificationTicker />
        </Reveal>

        <Reveal delay={0.2}>
          <EventsSection />
        </Reveal>
      </main>

      <WelcomeModal />
      <BottomNav />
    </div>
  )
}

export default Page
