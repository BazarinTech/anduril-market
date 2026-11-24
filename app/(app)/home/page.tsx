'use client'
import { HeroDisplay } from '@/components/home/hero-display'
import { MusicStories } from '@/components/home/music-stories'
import { NoticeTicker } from '@/components/home/notice-ticker'
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
      <Topbar title="Musically" brand />

      {/* Home, top to bottom: the hour and the stage, the tools to hand, the
          notice rail, then a rental laid out as pictures. The money is
          deliberately absent -- it lives in the wallet and on the account
          page, one tap away. */}
      <main className="mx-auto flex w-full max-w-md flex-col gap-7 px-4 pt-4">
        <Reveal>
          <HeroDisplay name={username} />
        </Reveal>

        <Reveal delay={0.08}>
          <QuickActions />
        </Reveal>

        <Reveal delay={0.14}>
          <NoticeTicker />
        </Reveal>

        <Reveal delay={0.2}>
          <MusicStories />
        </Reveal>
      </main>

      <WelcomeModal />
      <BottomNav />
    </div>
  )
}

export default Page
