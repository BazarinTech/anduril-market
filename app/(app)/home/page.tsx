'use client'
import { EventsSection } from '@/components/home/events-sections'
import { NotificationTicker } from '@/components/home/notification-ticker'
import { QuickActions } from '@/components/home/quick-actions'
import { VideoHero } from '@/components/home/video-hero'
import { WelcomeModal } from '@/components/home/welcome-modal'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { useMainStore } from '@/lib/stores/use-main-store'
import React, { useEffect } from 'react'


function Page() {
  const loginState = useMainStore((state) => state.loginState)
  useEffect(() => {
    loginState()
  }, [loginState])

  return (
    <div>

      <Topbar title="Sanderson Farms" />

         <div className="flex flex-col items-center w-full py-4 px-2 space-y-2">

          {/* Main Content */}
          {/* <main className="flex flex-col gap-6 py-4 px-4"> */}
            {/* Video Hero Section */}
            <div className="px-4">
              <VideoHero />
            </div>

            {/* Quick Actions Menu */}
            <QuickActions />

            {/* Notification Ticker */}
            <NotificationTicker />

            {/* Events Section */}
            <EventsSection />
          {/* </main> */}
         </div>
    
      <WelcomeModal />
      <BottomNav />
      </div>
  )
}

export default Page