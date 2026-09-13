"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu01Icon, Cancel01Icon } from "hugeicons-react"
import { BimaLogo } from "@/components/shared/brand-logo"

// In-page anchors. The old links pointed at /about and /incentives, neither of
// which exists, so every nav click on the landing page was a 404.
const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#get-started", label: "Get started" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Bima home">
            <BimaLogo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="px-4">
              <Link href="/register">Create account</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 md:hidden" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? (
              <Cancel01Icon className="h-6 w-6 text-foreground" />
            ) : (
              <Menu01Icon className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 border-t border-border pt-4">
                <Button asChild variant="outline" size="sm" className="h-10 flex-1">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm" className="h-10 flex-1">
                  <Link href="/register">Create account</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
