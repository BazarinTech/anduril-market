import { CustomerSupportIcon, Location01Icon } from "hugeicons-react"

const SUPPORT_URL = process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT

/**
 * Not currently rendered -- app/(app)/company/page.tsx has it commented out.
 *
 * It used to list "+254 700 123 456" and a made-up support email. Both were
 * placeholders; a member who used either would have reached a stranger or
 * nobody. The only real channel in this codebase is the support link in the
 * environment, so that is what is offered.
 */
export function ContactSection() {
  return (
    <div className="bg-muted/40 px-4 py-6">
      <h2 className="mb-4 text-base font-semibold text-foreground">Contact Us</h2>
      <div className="divide-y divide-border overflow-hidden rounded-xl bg-card ring-1 ring-border/70">
        {SUPPORT_URL && (
          <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 hover:bg-muted/60">
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <CustomerSupportIcon size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Customer support</p>
              <p className="text-sm font-medium text-foreground">Chat with our team</p>
            </div>
          </a>
        )}
        <div className="flex items-center gap-3 p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Location01Icon size={20} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="text-sm font-medium text-foreground">Nairobi, Kenya</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Bima. All rights reserved.
      </p>
    </div>
  )
}
