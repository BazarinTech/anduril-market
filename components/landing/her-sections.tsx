"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight02Icon } from "hugeicons-react"

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Announcement Badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="text-muted-foreground">Now hiring across 50+ cities</span>
        <Link href="/about" className="font-medium text-primary hover:underline">
          Learn more
        </Link>
      </div>

      {/* Main Headline */}
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
        Your gateway to
        <span className="text-primary"> farm earnings</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl text-pretty leading-relaxed">
        Join thousands of workers earning on their own terms. Connect with farm opportunities, promote products, and
        build your income with Sanderson Farms.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Button asChild size="lg" className="rounded-full px-8 text-base">
          <Link href="/register">
            Get started free
            <ArrowRight02Icon className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base bg-transparent">
          <Link href="/about">How it works</Link>
        </Button>
      </div>

      {/* Trust Indicator */}
      <p className="mt-16 text-sm text-muted-foreground">
        Trusted by <span className="font-semibold text-foreground">5,000+</span> workers nationwide
      </p>
    </section>
  )
}
