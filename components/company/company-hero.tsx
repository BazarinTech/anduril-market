"use client"

import { Building05Icon } from "hugeicons-react"

export function CompanyHero() {
  return (
    <div className="bg-primary text-primary-foreground px-4 py-8">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
          <Building05Icon size={48} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Sanderson Farms</h1>
          <p className="text-primary-foreground/80 mt-1">Empowering Workers, Growing Businesses</p>
        </div>
        <div className="flex gap-6 mt-2">
          <div className="text-center">
            <p className="text-2xl font-bold">5K+</p>
            <p className="text-xs text-primary-foreground/70">Workers</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-bold">200+</p>
            <p className="text-xs text-primary-foreground/70">Partners</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-bold">50+</p>
            <p className="text-xs text-primary-foreground/70">Cities</p>
          </div>
        </div>
      </div>
    </div>
  )
}
