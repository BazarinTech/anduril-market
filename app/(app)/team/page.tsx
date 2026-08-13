'use client'

import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckmarkCircle01Icon, Copy01Icon } from 'hugeicons-react'
import TeamTable from '@/components/team/team-table'
import { Button } from '@/components/ui/button'
import { useMainStore } from '@/lib/stores/use-main-store'
import { useInviteCode } from '@/lib/hooks/use-invite-code'
import { useCurrency } from '@/lib/hooks/use-currency'



function Page() {
  const [copied, setCopied] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [referralLink, setReferralLink] = useState("")
  const useInvite = useInviteCode()

  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)

  // useEffect(() => {
  //   loginState()
  // }, [loginState])

  useEffect(() => {
    if (mainDetails) {
      const inviteCode = useInvite.generate(mainDetails.user.ID)
      setReferralCode(inviteCode)
      setReferralLink(`${window.location.origin}/register?inviteCode=${inviteCode}`)
    }
  }, [mainDetails])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }
  return (
    <div>
      <Topbar title="Team"/>
      {/* Invite Section */}
      <div className="mx-4 mt-4 rounded-xl bg-muted/50 p-5 ">
        <p className="text-center text-sm text-muted-foreground">Invite friend with link shared</p>
        <p className="mt-2 text-center text-2xl font-bold tracking-wider text-foreground">{referralCode}</p>
        <p className="mt-2 break-all text-center text-xs text-muted-foreground">{referralLink}</p>
        <Button onClick={handleCopy} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {copied ? (
            <>
              <CheckmarkCircle01Icon size={18} className="mr-2" />
              COPIED!
            </>
          ) : (
            <>
              <Copy01Icon size={18} className="mr-2" />
              COPY
            </>
          )}
        </Button>
      </div>

      {/* Stats Section */}
      <div className="mx-4 mt-6 flex justify-between text-center">
        <div className="flex-1">
          <p className="text-xl font-bold text-foreground">{mainDetails?.referral.total_downlines}</p>
          <p className="text-xs text-muted-foreground">Team Size</p>
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-primary">{mainDetails?.referral.active_downlines}</p>
          <p className="text-xs text-muted-foreground">Total Active</p>
        </div>
      </div>
      <div className="mx-4 mt-4 text-center">
        <p className="text-xl font-bold text-foreground">{useCurrency(mainDetails?.wallet.invite_income ?? 0)}</p>
        <p className="text-xs text-muted-foreground">Invite Income</p>
      </div>

      {/* Team Members Section */}
      <div className="mx-4 mt-6">
        <div className="rounded-full border-2 border-primary py-3 text-center">
          <span className="text-sm font-medium tracking-widest text-foreground">TEAM MEMBERS</span>
        </div>
      </div>

      {/* Team Tabs */}
      <div className="mx-4 mt-4 mb-20">
        <Tabs defaultValue="teamB" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-primary p-1">
            <TabsTrigger
              value="teamB"
              className="rounded-full text-primary-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Level 1
            </TabsTrigger>
            <TabsTrigger
              value="teamC"
              className="rounded-full text-primary-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Level 2
            </TabsTrigger>
            <TabsTrigger
              value="teamD"
              className="rounded-full text-primary-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Level 3
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teamB" className="mt-4">
            <TeamTable members={mainDetails?.referral.level1 ?? []} />
          </TabsContent>
          <TabsContent value="teamC" className="mt-4">
            <TeamTable members={mainDetails?.referral.level2 ?? []} />
          </TabsContent>
          <TabsContent value="teamD" className="mt-4">
            <TeamTable members={mainDetails?.referral.level3 ?? []} />
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  )
}

export default Page