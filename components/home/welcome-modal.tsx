'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BrandBanner } from '@/components/shared/brand-banner'

const WHATSAPP_GROUP_URL = process.env.NEXT_PUBLIC_WHATSAPP_GROUP
const STORAGE_KEY = 'sf_show_welcome'

export function WelcomeModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const shouldShow = sessionStorage.getItem(STORAGE_KEY)
    if (shouldShow === 'true') {
      sessionStorage.removeItem(STORAGE_KEY)
      setOpen(true)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* No corner X: it would sit dark-on-dark over the banner. Escape, a tap
          outside, and "Get started" all still close the dialog. */}
      <DialogContent showCloseButton={false} className="mx-auto max-w-sm gap-0 overflow-hidden border-0 p-0">
        <BrandBanner
          eyebrow="Welcome"
          title="Welcome to Bima"
          className="rounded-none shadow-none"
        />

        <div className="space-y-4 px-5 pt-4 pb-5">
          <div>
            {/* Visually carried by the banner above; kept for screen readers,
                which need a dialog title to announce. */}
            <DialogTitle className="sr-only">Welcome to Bima</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              Pick a product, promote it, and collect your{" "}
              <span className="font-medium text-foreground">daily returns</span> as they build up.
              Top up and cash out straight to M-Pesa, and earn commission on everyone
              you bring into your team.
            </DialogDescription>
          </div>

          <div className="flex flex-col gap-2">
            {WHATSAPP_GROUP_URL && (
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] text-sm font-semibold text-white transition-colors hover:bg-[#20ba59]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join Our WhatsApp Group
            </a>
            )}

            <Button
              className="h-11 w-full text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Get started
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
