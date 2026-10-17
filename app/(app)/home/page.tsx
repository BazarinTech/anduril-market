'use client'
import { FarmDisplay } from '@/components/home/farm-display'
import { FarmStories } from '@/components/home/farm-stories'
import { FieldTicker } from '@/components/home/field-ticker'
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

      {/* The yard, top to bottom: the hour and the herd, the tools to hand, a
          word from the field, then the day itself laid out as pictures. The
          money is deliberately absent -- it lives in the purse and on the
          account page, one tap away. */}
      <main className="mx-auto flex w-full max-w-md flex-col gap-7 px-4 pt-4">
        <Reveal>
          <FarmDisplay name={username} />
        </Reveal>

        <Reveal delay={0.08}>
          <div data-tour="quick-actions">
            <QuickActions />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <FieldTicker />
        </Reveal>

        <Reveal delay={0.2}>
          <FarmStories />
        </Reveal>
      </main>

      <WelcomeModal />
      <BottomNav />
    </div>
  )
}

export default Page
