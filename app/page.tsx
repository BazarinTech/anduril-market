
import { CTASection } from "@/components/landing/cta-sections"
import { FeaturesSection } from "@/components/landing/features-section"
import { Footer } from "@/components/landing/footer"
import { HeroSection } from "@/components/landing/her-sections"
import { HowItWorksSection } from "@/components/landing/how-it-works"
import { Navbar } from "@/components/landing/navbat"
import { StatsSection } from "@/components/landing/stats-sections"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
