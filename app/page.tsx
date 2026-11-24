import { CTASection } from "@/components/landing/cta-sections"
import { FeaturesSection } from "@/components/landing/features-section"
import { Footer } from "@/components/landing/footer"
import { HeroSection, PlayerCard } from "@/components/landing/her-sections"
import { HowItWorksSection } from "@/components/landing/how-it-works"
import { Navbar } from "@/components/landing/navbat"
import { StatsSection } from "@/components/landing/stats-sections"
import { Reveal } from "@/components/shared/reveal"

/**
 * The landing page, top to bottom: the stage and the promise, a player card
 * hanging off it, the plain facts, how it works as a tracklist, the features
 * as a bento grid, and the way in.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PlayerCard />
        <Reveal>
          <StatsSection />
        </Reveal>
        <Reveal>
          <HowItWorksSection />
        </Reveal>
        <Reveal>
          <FeaturesSection />
        </Reveal>
        <Reveal>
          <CTASection />
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
