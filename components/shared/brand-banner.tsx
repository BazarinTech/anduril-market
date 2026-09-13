import { useId } from "react"
import { cn } from "@/lib/utils"
import { BimaLogo } from "./brand-logo"

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  size?: "sm" | "lg"
  /** Show the logo in the top-left corner. */
  showLogo?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * The Bima hero banner: ink surface, blue light trails, and copy.
 *
 * This replaces the photographic banners. Those were pictures of another
 * company's building signage, so they had to go regardless -- and a drawn
 * banner stays crisp, weighs nothing, and follows the theme tokens.
 */
export function BrandBanner({
  eyebrow,
  title,
  subtitle,
  size = "sm",
  showLogo = true,
  className,
  children,
}: Props) {
  const trailId = `bima-trail-${useId().replace(/:/g, "")}`
  const large = size === "lg"

  return (
    <div
      className={cn(
        "bg-hero relative isolate w-full overflow-hidden rounded-xl shadow-premium",
        large ? "min-h-72 p-7 sm:p-10" : "min-h-44 p-5",
        className,
      )}
    >
      {/* Light trails: long, shallow curves sweeping up to the right. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id={trailId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4D8FEA" stopOpacity="0" />
            <stop offset="0.55" stopColor="#4D8FEA" stopOpacity="0.55" />
            <stop offset="1" stopColor="#CFE2FF" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <g fill="none" stroke={`url(#${trailId})`} strokeLinecap="round">
          <path d="M40 236C150 214 250 160 430 58" strokeWidth="1.6" />
          <path d="M70 250C180 226 270 176 440 86" strokeWidth="1" opacity="0.7" />
          <path d="M110 262C210 240 300 196 450 118" strokeWidth="0.7" opacity="0.5" />
          <path d="M10 222C130 200 230 140 420 26" strokeWidth="0.6" opacity="0.45" />
          <path d="M160 270C250 252 330 216 460 150" strokeWidth="0.5" opacity="0.35" />
        </g>
      </svg>

      <div className={cn("flex h-full flex-col", large ? "gap-6" : "gap-4")}>
        {showLogo && <BimaLogo size={large ? "md" : "sm"} inverse />}

        <div className={cn("max-w-md", large ? "mt-auto pt-10" : "mt-auto pt-4")}>
          {eyebrow && <p className="text-eyebrow text-brand-bright">{eyebrow}</p>}
          <h2
            className={cn(
              "mt-1.5 font-semibold text-balance text-ink-foreground",
              large ? "text-3xl sm:text-4xl" : "text-xl",
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={cn("mt-2 text-ink-foreground/70 text-pretty", large ? "text-base" : "text-sm")}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </div>
  )
}
