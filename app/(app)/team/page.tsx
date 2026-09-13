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
      <div className="bg-hero relative mx-4 mt-4 overflow-hidden rounded-xl p-5 shadow-premium">
        <p className="text-eyebrow text-brand-bright">Your invite code</p>
        <p className="mt-2 font-mono text-3xl font-semibold tracking-[0.2em] text-ink-foreground">{referralCode}</p>
        <p className="mt-2 break-all text-xs text-ink-foreground/60">{referralLink}</p>
        <Button onClick={handleCopy} className="mt-4 h-11 w-full bg-white text-ink hover:bg-white/90">
          {copied ? (
            <>
              <CheckmarkCircle01Icon size={18} className="mr-2" />
              Link copied
            </>
          ) : (
            <>
              <Copy01Icon size={18} className="mr-2" />
              Copy invite link
            </>
          )}
        </Button>
      </div>

      {/* Stats Section */}
      <dl className="mx-4 mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-border text-center ring-1 ring-border/70">
        <div className="bg-card px-2 py-3">
          <dd className="text-lg font-semibold text-foreground tabular-nums">{mainDetails?.referral.total_downlines}</dd>
          <dt className="text-[11px] text-muted-foreground">Team Size</dt>
        </div>
        <div className="bg-card px-2 py-3">
          <dd className="text-lg font-semibold text-primary tabular-nums">{mainDetails?.referral.active_downlines}</dd>
          <dt className="text-[11px] text-muted-foreground">Total Active</dt>
        </div>
        <div className="bg-card px-2 py-3">
          <dd className="text-sm leading-7 font-semibold text-foreground tabular-nums">{useCurrency(mainDetails?.wallet.invite_income ?? 0)}</dd>
          <dt className="text-[11px] text-muted-foreground">Invite Income</dt>
        </div>
      </dl>

      {/* Team Members Section */}
      <div className="mx-4 mt-6">
        <div className="flex items-center gap-3">
          <span className="text-eyebrow text-muted-foreground">Team members</span>
          <span className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Team Tabs */}
      <div className="mx-4 mt-4 mb-20">
        <Tabs defaultValue="teamB" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="teamB"
            >
              Level 1
            </TabsTrigger>
            <TabsTrigger
              value="teamC"
            >
              Level 2
            </TabsTrigger>
            <TabsTrigger
              value="teamD"
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