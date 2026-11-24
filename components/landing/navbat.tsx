"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu01Icon, Cancel01Icon } from "hugeicons-react"
import { MusicallyLogo } from "@/components/shared/brand-logo"

// In-page anchors only: every target is a section on this page.
const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#get-started", label: "Get started" },
]

/**
 * The landing nav sits on the stage itself: dark glass over the hero, so the
 * top of the page reads as one surface instead of a white bar on a dark band.
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 text-ink-foreground backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Musically home">
            <MusicallyLogo size="sm" inverse />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm" className="text-ink-foreground hover:bg-white/10 hover:text-ink-foreground">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="px-4">
              <Link href="/register">Create account</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <Cancel01Icon className="h-6 w-6" /> : <Menu01Icon className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 border-t border-white/10 pt-4">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-10 flex-1 text-ink-foreground ring-1 ring-white/20 hover:bg-white/10 hover:text-ink-foreground"
                >
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
