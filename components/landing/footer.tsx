import Link from "next/link"
import { BimaLogo } from "@/components/shared/brand-logo"

const SUPPORT_URL = process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-foreground"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <BimaLogo size="sm" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Products, team rewards and an M-Pesa wallet in one account.
            </p>
          </div>

          <div>
            <h4 className="text-eyebrow text-foreground">Explore</h4>
            <ul className="mt-4 space-y-3">
              <li><a href="#features" className={linkClass}>Features</a></li>
              <li><a href="#how-it-works" className={linkClass}>How it works</a></li>
              <li><Link href="/products" className={linkClass}>Products</Link></li>
              <li><Link href="/team" className={linkClass}>My Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow text-foreground">Account</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/login" className={linkClass}>Sign in</Link></li>
              <li><Link href="/register" className={linkClass}>Create account</Link></li>
              <li><Link href="/mine" className={linkClass}>My account</Link></li>
              <li><Link href="/records" className={linkClass}>Records</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow text-foreground">Support</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/forgot-password" className={linkClass}>Reset password</Link></li>
              <li><Link href="/cashout-wallet" className={linkClass}>Wallet settings</Link></li>
              {/*
                The support channel comes from the environment. This column used
                to list a placeholder phone number (+254 700 000 000) and a
                made-up email address -- anything a user sent there would have
                gone to a stranger, or nowhere.
              */}
              {SUPPORT_URL && (
                <li>
                  <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Customer support
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Bima. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className={linkClass}>Privacy</Link>
            <Link href="#" className={linkClass}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
