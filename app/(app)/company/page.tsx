'use client'
import { CompanyHero } from '@/components/company/company-hero'
import { ContactSection } from '@/components/company/contact-sections'
import { HowItWorks } from '@/components/company/how-it-works'
import { MissionSection } from '@/components/company/mission'
import { ServicesSection } from '@/components/company/service-section'
import Topbar from '@/components/shared/topbar'
import React from 'react'


function Page() {
  return (
    <div>
      <Topbar title="Company" backBtn/>
      
      <CompanyHero />
      <MissionSection  />
      <ServicesSection />
      <HowItWorks />
      {/* <ContactSection /> */}
    </div>
  )
}

export default Page